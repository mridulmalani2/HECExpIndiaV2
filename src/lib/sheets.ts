import Papa from 'papaparse'
import type { CardData, SheetRow } from '@/types'
import type { SectionConfig } from '@/config/site.config'

const CACHE_DURATION = 5 * 60 * 1000

interface CacheEntry {
  data: CardData[]
  timestamp: number
}

const cache = new Map<string, CacheEntry>()

function normalizeKey(key: string): string {
  return key.toLowerCase().trim().replace(/[_-]/g, ' ')
}

function findValue(row: SheetRow, candidates: string[] = []): string {
  for (const key in row) {
    const normalizedKey = normalizeKey(key)
    for (const candidate of candidates) {
      if (normalizedKey === normalizeKey(candidate) || normalizedKey.includes(normalizeKey(candidate))) {
        return row[key]?.trim() || ''
      }
    }
  }
  return ''
}

function convertSheetUrlToCsv(sheetUrl: string): string {
  if (!sheetUrl) return ''
  
  // Already in CSV format
  if (sheetUrl.includes('/export?format=csv') || sheetUrl.includes('output=csv')) {
    return sheetUrl
  }
  
  // Try to extract spreadsheet ID and gid from various URL formats
  const spreadsheetIdMatch = sheetUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)
  const gidMatch = sheetUrl.match(/[#&]gid=([0-9]+)/)
  
  if (spreadsheetIdMatch) {
    const spreadsheetId = spreadsheetIdMatch[1]
    const gid = gidMatch ? gidMatch[1] : '0'
    return `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=${gid}`
  }
  
  return sheetUrl
}

function isValidUrl(url: string | undefined): boolean {
  if (!url || !url.trim()) return false
  try {
    const parsed = new URL(url.trim())
    const allowedSchemes = ['http:', 'https:', 'mailto:']
    return allowedSchemes.includes(parsed.protocol)
  } catch {
    return false
  }
}

export async function fetchSheetData(
  section: SectionConfig
): Promise<CardData[]> {
  const cacheKey = section.id
  const cached = cache.get(cacheKey)
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }

  try {
    let csvUrl = section.sheetUrl
    
    if (!csvUrl) {
      const fallbackCsvPath = `/data/${section.id}.csv`
      csvUrl = fallbackCsvPath
    } else {
      csvUrl = convertSheetUrlToCsv(csvUrl)
    }

    const response = await fetch(csvUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`)
    }

    const csvText = await response.text()
    
    const parseResult = await new Promise<Papa.ParseResult<SheetRow>>((resolve, reject) => {
      Papa.parse<SheetRow>(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: resolve,
        error: reject,
      })
    })

    if (parseResult.errors.length > 0) {
      console.warn(`CSV parsing warnings for ${section.id}:`, parseResult.errors)
    }

    const hasSourceUrlColumn = parseResult.data.length > 0 && 
      Object.keys(parseResult.data[0]).some(key => 
        normalizeKey(key) === normalizeKey('source_url')
      )
    
    if (!hasSourceUrlColumn) {
      console.warn(`⚠️ Section "${section.title}" (${section.id}): CSV does not contain a "source_url" column. No redirects will be available for this section.`)
    } else {
      console.log(`✓ Section "${section.title}" (${section.id}): "source_url" column detected.`)
    }

    let validLinkCount = 0

    const cards: CardData[] = parseResult.data.map((row, index) => {
      const title = findValue(row, section.fieldMappings?.title || ['title', 'name'])
      const description = findValue(row, section.fieldMappings?.description || ['description', 'summary'])
      const image = findValue(row, section.fieldMappings?.image || ['image', 'image url'])
      
      let link: string | undefined = undefined
      
      if (hasSourceUrlColumn) {
        const rawLink = findValue(row, section.fieldMappings?.link || ['source_url', 'url', 'link'])
        if (isValidUrl(rawLink)) {
          link = rawLink.trim()
          validLinkCount++
        }
      }

      const metadata: Record<string, string> = {}
      const excludeKeys = new Set<string>()
      
      for (const key in row) {
        const normalizedKey = normalizeKey(key)
        if (
          section.fieldMappings?.title?.some(t => normalizeKey(t) === normalizedKey) ||
          section.fieldMappings?.description?.some(d => normalizeKey(d) === normalizedKey) ||
          section.fieldMappings?.image?.some(i => normalizeKey(i) === normalizedKey) ||
          section.fieldMappings?.link?.some(l => normalizeKey(l) === normalizedKey)
        ) {
          excludeKeys.add(key)
        }
      }

      const imageRelatedKeys = ['image_url', 'imageurl', 'image url', 'image', 'photo', 'thumbnail', 'poster']
      const linkRelatedKeys = ['source_url', 'sourceurl', 'source url', 'url', 'link']
      
      for (const [key, value] of Object.entries(row)) {
        const normalizedKey = normalizeKey(key)
        const isImageRelated = imageRelatedKeys.some(ik => normalizeKey(ik) === normalizedKey)
        const isLinkRelated = linkRelatedKeys.some(lk => normalizeKey(lk) === normalizedKey)
        
        if (!excludeKeys.has(key) && !isImageRelated && !isLinkRelated && value?.trim()) {
          metadata[key] = value.trim()
        }
      }

      return {
        id: `${section.id}-${index}`,
        title: title || '(Untitled)',
        description,
        image,
        link,
        metadata,
        section: section.id,
      }
    })

    if (hasSourceUrlColumn) {
      console.log(`  → ${validLinkCount} row(s) have valid source_url values`)
    }

    cache.set(cacheKey, {
      data: cards,
      timestamp: Date.now(),
    })

    return cards
  } catch (error) {
    console.error(`Error fetching sheet data for ${section.id}:`, error)
    return []
  }
}

export function clearCache() {
  cache.clear()
}

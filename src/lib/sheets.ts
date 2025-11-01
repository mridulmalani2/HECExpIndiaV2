import Papa from 'papaparse'
import type { CardData, SheetRow } from '@/types'
import type { SectionConfig } from '@/config/site.config'

const CACHE_DURATION = 5 * 60 * 1000

interface CacheEntry {
  data: CardData[]
  timestamp: number
}

const cache = new Map<string, CacheEntry>()

function convertSheetUrlToCsv(sheetUrl: string): string {
  if (!sheetUrl) return ''
  
  if (sheetUrl.includes('/export?format=csv') || sheetUrl.includes('output=csv')) {
    return sheetUrl
  }
  
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

    if (parseResult.data.length === 0) {
      console.warn(`⚠️ Section "${section.title}" (${section.id}): No data found in CSV`)
      return []
    }

    const columnNames = Object.keys(parseResult.data[0])
    
    console.log(`✓ Section "${section.title}" (${section.id}): Processing ${parseResult.data.length} rows with columns:`, columnNames)

    let validLinkCount = 0

    const cards: CardData[] = parseResult.data
      .map((row, index) => {
        const rowValues = Object.values(row)
        
        const title = (rowValues[0] as string || '').trim()
        const imageUrl = (rowValues[1] as string || '').trim()
        const sourceUrl = (rowValues[2] as string || '').trim()
        
        if (!title) {
          return null
        }

        const validSourceUrl = isValidUrl(sourceUrl) ? sourceUrl : undefined
        if (validSourceUrl) {
          validLinkCount++
        }

        const metadata: Record<string, string> = {}
        
        columnNames.slice(3).forEach((columnName, idx) => {
          const value = (rowValues[idx + 3] as string || '').trim()
          if (value && columnName) {
            metadata[columnName] = value
          }
        })

        return {
          id: `${section.id}-${index}`,
          title: title || '(Untitled)',
          description: undefined,
          image: imageUrl || undefined,
          link: validSourceUrl,
          metadata,
          section: section.id,
        } as CardData
      })
      .filter((card): card is CardData => card !== null)

    console.log(`  → ${cards.length} cards created, ${validLinkCount} with valid source_url`)

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

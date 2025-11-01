export interface CardData {
  id: string
  title: string
  description?: string
  image?: string
  link?: string
  metadata: Record<string, string>
  section: string
}

export interface SectionData {
  id: string
  title: string
  emoji: string
  description: string
  cards: CardData[]
}

export interface SheetRow {
  [key: string]: string
}

export type ThemeMode = 'light' | 'dark'

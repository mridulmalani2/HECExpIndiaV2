/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SHEET_NEWS?: string
  readonly VITE_SHEET_BOLLYWOOD?: string
  readonly VITE_SHEET_RESTAURANTS?: string
  readonly VITE_SHEET_RECIPES?: string
  readonly VITE_SHEET_EVENTS?: string
  readonly VITE_SHEET_RESOURCES?: string
  readonly VITE_SHEET_ABOUT?: string
  readonly VITE_SITE_TITLE?: string
  readonly VITE_SITE_DESCRIPTION?: string
  readonly VITE_LOGO_URL?: string
  readonly VITE_GOOGLE_CLIENT_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

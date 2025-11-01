import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function LanguageToggle() {
  const [currentLang, setCurrentLang] = useState<'en' | 'fr'>('en')

  useEffect(() => {
    const checkLanguage = () => {
      const frame = document.querySelector('.goog-te-menu-frame') as HTMLIFrameElement
      if (frame?.contentWindow) {
        try {
          const selectedLang = frame.contentWindow.document.querySelector('.goog-te-menu2-item-selected')
          if (selectedLang?.textContent?.toLowerCase().includes('french')) {
            setCurrentLang('fr')
          } else {
            setCurrentLang('en')
          }
        } catch (e) {
          // Ignore cross-origin errors
        }
      }
    }

    const observer = new MutationObserver(checkLanguage)
    observer.observe(document.body, { childList: true, subtree: true })
    
    return () => observer.disconnect()
  }, [])

  const changeLanguage = (lang: 'en' | 'fr') => {
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement
    if (select) {
      select.value = lang
      select.dispatchEvent(new Event('change'))
      setCurrentLang(lang)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div id="google_translate_element" className="hidden" />
      
      <motion.div
        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
        whileHover={{ scale: 1.02 }}
      >
        <span className="text-sm">🌐</span>
        <button
          onClick={() => changeLanguage('en')}
          className={`px-2 py-0.5 text-xs font-medium rounded transition-colors ${
            currentLang === 'en'
              ? 'bg-saffron-500 text-white'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
          aria-label="Switch to English"
        >
          EN
        </button>
        <span className="text-gray-400 dark:text-gray-600">|</span>
        <button
          onClick={() => changeLanguage('fr')}
          className={`px-2 py-0.5 text-xs font-medium rounded transition-colors ${
            currentLang === 'fr'
              ? 'bg-saffron-500 text-white'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
          aria-label="Switch to French"
        >
          FR
        </button>
      </motion.div>
    </div>
  )
}

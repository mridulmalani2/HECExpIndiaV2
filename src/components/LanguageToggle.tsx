import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: any
      }
    }
  }
}

export function LanguageToggle() {
  const [currentLang, setCurrentLang] = useState<'en' | 'fr'>('en')
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    let observerCleanup: (() => void) | null = null

    // Load Google Translate script dynamically
    const loadGoogleTranslateScript = () => {
      if (window.google?.translate || document.querySelector('script[src*="translate.google.com"]')) {
        console.log('Google Translate script already loaded or loading')
        return
      }

      const script = document.createElement('script')
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      script.async = true
      script.onerror = () => {
        console.error('Failed to load Google Translate script')
      }
      document.head.appendChild(script)
    }

    loadGoogleTranslateScript()

    const checkIfReady = () => {
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement
      if (select && !isReady) {
        console.log('Google Translate widget is ready!')
        setIsReady(true)
        
        const observer = new MutationObserver(() => {
          const currentValue = select.value
          console.log('Language changed to:', currentValue)
          if (currentValue === 'fr') {
            setCurrentLang('fr')
          } else {
            setCurrentLang('en')
          }
        })
        
        observer.observe(select, { attributes: true, attributeFilter: ['value'] })
        
        observerCleanup = () => observer.disconnect()
      }
    }

    const intervalId = setInterval(checkIfReady, 300)
    
    const timeoutId = setTimeout(() => {
      clearInterval(intervalId)
      if (!isReady) {
        console.warn('Google Translate widget did not load within 10 seconds')
        console.warn('Please check if translate.google.com is accessible from your network')
      }
    }, 15000)

    return () => {
      clearInterval(intervalId)
      clearTimeout(timeoutId)
      if (observerCleanup) observerCleanup()
    }
  }, [isReady])

  const changeLanguage = (lang: 'en' | 'fr') => {
    console.log('Attempting to change language to:', lang)
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement
    if (select) {
      console.log('Select found, current value:', select.value)
      select.value = lang
      select.dispatchEvent(new Event('change', { bubbles: true }))
      setTimeout(() => setCurrentLang(lang), 100)
    } else {
      console.error('Google Translate select element not found')
      alert('Translation feature is still loading. Please wait a moment and try again.')
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div id="google_translate_element" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }} />
      
      <motion.div
        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ${
          !isReady ? 'opacity-50' : 'opacity-100'
        }`}
        whileHover={isReady ? { scale: 1.02 } : {}}
        title={!isReady ? 'Loading translation widget...' : 'Switch language'}
      >
        <span className="text-sm">{isReady ? '🌐' : '⏳'}</span>
        <button
          onClick={() => changeLanguage('en')}
          className={`px-2 py-0.5 text-xs font-medium rounded transition-colors ${
            currentLang === 'en'
              ? 'bg-saffron-500 text-white'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          } ${!isReady ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          aria-label="Switch to English"
          disabled={!isReady}
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
          } ${!isReady ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          aria-label="Switch to French"
          disabled={!isReady}
        >
          FR
        </button>
      </motion.div>
    </div>
  )
}

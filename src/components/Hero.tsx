import { motion } from 'framer-motion'
import { siteConfig } from '@/config/site.config'

export function Hero() {
  const scrollToContent = () => {
    const firstSection = siteConfig.sections.find(s => s.enabled)
    if (firstSection) {
      const element = document.getElementById(firstSection.id)
      if (element) {
        const offset = 80
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth',
        })
      }
    }
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-saffron-50 via-peacock-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950" />
      
      {/* Rangoli-inspired decorative elements */}
      <div className="absolute inset-0 opacity-20 dark:opacity-30">
        {/* Large rangoli circles with color pops */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-saffron-500 to-orange-400 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-pulse" />
        <div className="absolute top-40 right-10 w-80 h-80 bg-gradient-to-br from-peacock-500 to-cyan-400 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-gradient-to-br from-pink-500 to-rose-400 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-br from-turmeric-500 to-yellow-400 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-gradient-to-br from-indigo-500 to-purple-400 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Geometric rangoli patterns */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
        <svg className="absolute top-10 right-20 w-64 h-64 text-saffron-600 dark:text-saffron-400 animate-spin-slow" fill="currentColor" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="4" />
          <circle cx="50" cy="30" r="3" />
          <circle cx="50" cy="70" r="3" />
          <circle cx="30" cy="50" r="3" />
          <circle cx="70" cy="50" r="3" />
          <circle cx="35" cy="35" r="2" />
          <circle cx="65" cy="35" r="2" />
          <circle cx="35" cy="65" r="2" />
          <circle cx="65" cy="65" r="2" />
        </svg>
        
        <svg className="absolute bottom-20 left-20 w-72 h-72 text-peacock-600 dark:text-peacock-400 animate-spin-slow" fill="currentColor" viewBox="0 0 100 100" style={{ animationDirection: 'reverse' }}>
          <path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-saffron-200 dark:border-saffron-800">
            <span className="text-2xl">🪔</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Discover the Vibrant Heart of India
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold mb-6">
            <span className="block text-gray-900 dark:text-white">Experience</span>
            <span className="block gradient-text">India</span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Immerse yourself in the colors, flavors, and stories of India — from Bollywood magic to culinary delights
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              onClick={scrollToContent}
              className="btn btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Exploring
              <svg className="w-5 h-5 ml-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.button>

            <motion.a
              href="#about"
              className="btn btn-secondary text-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto"
        >
          {siteConfig.sections.filter(s => s.enabled).slice(0, 6).map((section, index) => (
            <motion.a
              key={section.id}
              href={`#${section.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-all"
            >
              <span className="text-4xl">{section.emoji}</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {section.title}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

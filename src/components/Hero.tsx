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
      
      {/* Rangoli-inspired decorative elements - strengthened visibility */}
      <div className="absolute inset-0 opacity-35 dark:opacity-40">
        {/* Large rangoli circles with color pops */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-saffron-500 to-orange-400 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-pulse" />
        <div className="absolute top-40 right-10 w-80 h-80 bg-gradient-to-br from-peacock-500 to-cyan-400 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-gradient-to-br from-pink-500 to-rose-400 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-br from-turmeric-500 to-yellow-400 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-gradient-to-br from-indigo-500 to-purple-400 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-saffron-200 dark:border-saffron-800">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Discover the Vibrant Heart of India
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold mb-6">
            <span className="block text-gray-900 dark:text-white">Experience</span>
            <span className="block gradient-text">India</span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience India is a cultural-hub for international students interested in Indian culture, news, movies and more.
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

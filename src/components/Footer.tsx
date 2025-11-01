import { motion } from 'framer-motion'
import { siteConfig } from '@/config/site.config'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative mt-20 bg-gradient-to-br from-saffron-50 via-peacock-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-serif font-bold mb-3 gradient-text">
              {siteConfig.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {siteConfig.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {siteConfig.sections.filter(s => s.enabled).map(section => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-saffron-600 dark:hover:text-saffron-400 transition-colors"
                  >
                    {section.emoji} {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
              About This Project
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              A student-led initiative to help international students explore Indian culture through movies, food, sports, and more.
            </p>
            <div className="flex gap-3">
              <a
                href="mailto:mridul.malani@alumni.ashoka.edu.in"
                className="text-gray-600 dark:text-gray-400 hover:text-saffron-600 dark:hover:text-saffron-400 transition-colors"
                aria-label="Email"
              >
                📧
              </a>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} {siteConfig.title}. Built with 🤍 for cultural discovery.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Powered by React, Tailwind CSS & Google Sheets
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

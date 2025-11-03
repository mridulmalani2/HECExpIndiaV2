import { useState } from 'react'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { Card } from './Card'
import { CardModal } from './CardModal'
import type { CardData } from '@/types'
import type { SectionConfig } from '@/config/site.config'
import { fetchSheetData } from '@/lib/sheets'
import { siteConfig } from '@/config/site.config'

interface SectionProps {
  section: SectionConfig
  searchQuery: string
}

export function Section({ section, searchQuery }: SectionProps) {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null)
  const [visibleCount, setVisibleCount] = useState(siteConfig.features.cardsPerPage)

  const { data: cards = [], isLoading, error } = useQuery({
    queryKey: ['section', section.id],
    queryFn: () => fetchSheetData(section),
  })

  const filteredCards = cards.filter(card => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      card.title.toLowerCase().includes(query) ||
      card.description?.toLowerCase().includes(query) ||
      Object.values(card.metadata).some(val => val.toLowerCase().includes(query))
    )
  })

  const visibleCards = filteredCards.slice(0, visibleCount)
  const hasMore = visibleCount < filteredCards.length

  if (isLoading) {
    return (
      <section id={section.id} className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3">
              {section.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="card h-96 animate-pulse border-2 border-gray-200 dark:border-gray-700">
                <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-700" />
                <div className="p-5 space-y-3">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id={section.id} className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3">
              {section.title}
            </h2>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              Failed to load {section.title.toLowerCase()}. Please try again later.
            </p>
          </div>
        </div>
      </section>
    )
  }

  if (filteredCards.length === 0) {
    return (
      <section id={section.id} className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3">
              {section.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {section.description}
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              {searchQuery ? 'No results found for your search.' : 'No content available yet.'}
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section 
        id={section.id} 
        className="section-padding relative"
        style={{
          backgroundImage: section.backgroundImage ? `url(${section.backgroundImage})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Background overlay */}
        {section.backgroundImage && (
          <div 
            className="absolute inset-0 bg-gradient-to-b from-white/[0.73] via-white/[0.69] to-white/[0.73] dark:from-gray-900/95 dark:via-gray-900/90 dark:to-gray-900/95"
            style={{
              backgroundColor: section.backgroundOverlay || undefined,
            }}
          />
        )}
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-3">
              <span className="gradient-text">{section.title}</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {section.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-8">
            {visibleCards.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                onCardClick={setSelectedCard}
                index={index}
              />
            ))}
          </div>

          {(hasMore || visibleCount > siteConfig.features.cardsPerPage) && (
            <div className="text-center flex gap-4 justify-center">
              {hasMore && (
                <motion.button
                  onClick={() => setVisibleCount(prev => prev + siteConfig.features.cardsPerPage)}
                  className="btn btn-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Load More
                </motion.button>
              )}
              {visibleCount > siteConfig.features.cardsPerPage && (
                <motion.button
                  onClick={() => setVisibleCount(siteConfig.features.cardsPerPage)}
                  className="btn btn-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Show Less
                </motion.button>
              )}
            </div>
          )}
        </div>
      </section>

      <CardModal
        card={selectedCard}
        isOpen={selectedCard !== null}
        onClose={() => setSelectedCard(null)}
      />
    </>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { CardData } from '@/types'

interface CardProps {
  card: CardData
  onCardClick: (card: CardData) => void
  index: number
}

export function Card({ card, onCardClick, index }: CardProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const hasLink = Boolean(card.link)

  const handleClick = () => {
    if (hasLink && card.link) {
      window.open(card.link, '_blank', 'noopener,noreferrer')
    } else {
      onCardClick(card)
    }
  }

  const handleImageClick = (e: React.MouseEvent) => {
    if (hasLink && card.link) {
      e.stopPropagation()
      window.open(card.link, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.2 } }}
      className="card overflow-hidden group cursor-pointer h-full flex flex-col border-2 border-gray-200 dark:border-gray-700 hover:border-saffron-500 dark:hover:border-saffron-400 hover:shadow-2xl"
      onClick={handleClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
        {card.image && !imageError ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-saffron-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            <img
              src={card.image}
              alt={card.title}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              onClick={handleImageClick}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              } ${hasLink ? 'cursor-pointer' : ''}`}
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            {card.section === 'news' && '📰'}
            {card.section === 'bollywood' && '🎬'}
            {card.section === 'restaurants' && '🍛'}
            {card.section === 'recipes' && '🍲'}
            {card.section === 'events' && '🎭'}
            {card.section === 'resources' && '📚'}
          </div>
        )}
        {hasLink && (
          <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-saffron-600 dark:group-hover:text-saffron-400 transition-colors">
          {card.title}
        </h3>
        
        {card.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-3 flex-1">
            {card.description}
          </p>
        )}

        {Object.keys(card.metadata).length > 0 && (
          <div className="mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onCardClick(card)
              }}
              className="text-sm text-saffron-600 dark:text-saffron-400 font-medium hover:underline"
            >
              View details →
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

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
    onCardClick(card)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.2 } }}
      className="card overflow-hidden group cursor-pointer h-full flex flex-col"
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
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
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
            {card.section === 'peoplespeak' && '💬'}
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

        <div className="mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
          <span className="text-sm text-saffron-600 dark:text-saffron-400 font-medium">
            {hasLink ? 'Click to view details →' : 'Click for more info →'}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

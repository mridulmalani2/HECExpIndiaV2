export interface SectionConfig {
  id: string
  title: string
  emoji: string
  description: string
  sheetUrl: string
  sheetId?: string
  gid?: string
  enabled: boolean
  fieldMappings?: {
    title?: string[]
    description?: string[]
    image?: string[]
    link?: string[]
  }
}

export interface SiteConfig {
  title: string
  description: string
  logoUrl: string
  sections: SectionConfig[]
  theme: {
    primaryColor: string
    accentColor: string
  }
  features: {
    enableSearch: boolean
    enableFiltering: boolean
    cardsPerPage: number
  }
}

export const siteConfig: SiteConfig = {
  title: 'Experience India',
  description: 'Discover Indian culture, cuisine, and cinema with HEC Paris',
  logoUrl: 'https://via.placeholder.com/150x50/f97316/ffffff?text=Experience+India',
  
  sections: [
    {
      id: 'news',
      title: 'News',
      emoji: '📰',
      description: 'Latest updates from India and France',
      sheetUrl: '',
      enabled: true,
      fieldMappings: {
        title: ['title', 'headline', 'name'],
        description: ['description', 'summary', 'snippet'],
        image: ['image', 'image url', 'thumbnail'],
        link: ['url', 'link', 'article url'],
      },
    },
    {
      id: 'bollywood',
      title: 'Bollywood',
      emoji: '🎬',
      description: 'Classic and contemporary Indian cinema',
      sheetUrl: '',
      enabled: true,
      fieldMappings: {
        title: ['title', 'movie title', 'name'],
        description: ['description', 'summary', 'plot'],
        image: ['image', 'poster', 'poster url'],
        link: ['url', 'link', 'watch url'],
      },
    },
    {
      id: 'restaurants',
      title: 'Restaurants',
      emoji: '🍛',
      description: 'Authentic Indian dining in Paris',
      sheetUrl: '',
      enabled: true,
      fieldMappings: {
        title: ['name', 'restaurant name', 'title'],
        description: ['description', 'about', 'cuisine'],
        image: ['image', 'photo', 'thumbnail'],
        link: ['url', 'google maps url', 'map url'],
      },
    },
    {
      id: 'recipes',
      title: 'Recipes',
      emoji: '🍲',
      description: 'Easy Indian recipes for students',
      sheetUrl: '',
      enabled: true,
      fieldMappings: {
        title: ['title', 'recipe name', 'name'],
        description: ['description', 'summary'],
        image: ['image', 'photo'],
        link: ['url', 'recipe url', 'link'],
      },
    },
    {
      id: 'events',
      title: 'Events',
      emoji: '🎭',
      description: 'Cultural events and celebrations',
      sheetUrl: '',
      enabled: true,
      fieldMappings: {
        title: ['title', 'event name', 'name'],
        description: ['description', 'details'],
        image: ['image', 'poster', 'photo'],
        link: ['url', 'tickets url', 'link'],
      },
    },
    {
      id: 'resources',
      title: 'Resources',
      emoji: '📚',
      description: 'Helpful guides and information',
      sheetUrl: '',
      enabled: true,
      fieldMappings: {
        title: ['title', 'name'],
        description: ['description', 'summary'],
        image: ['image', 'thumbnail'],
        link: ['url', 'link'],
      },
    },
  ],
  
  theme: {
    primaryColor: 'saffron',
    accentColor: 'peacock',
  },
  
  features: {
    enableSearch: true,
    enableFiltering: true,
    cardsPerPage: 6,
  },
}

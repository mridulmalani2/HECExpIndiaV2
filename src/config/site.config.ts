export interface SectionConfig {
  id: string
  title: string
  emoji: string
  description: string
  sheetUrl: string
  sheetId?: string
  gid?: string
  enabled: boolean
  backgroundImage?: string
  backgroundOverlay?: string
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
  description: 'Discover Indian culture, cuisine, and cinema and more..',
  logoUrl: 'https://via.placeholder.com/150x50/f97316/ffffff?text=Experience+India',
  
  sections: [
    {
      id: 'news',
      title: 'News',
      emoji: '📰',
      description: 'What\'s happening in India?',
      sheetUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQDSQLX2XttGTN_wQrtIK_8rfEMwDxx8cnlShmze6z-XQGalPer_3YNrc4jUufSzkk1Av6rP0yRcvcu/pub?gid=0&single=true&output=csv',
      enabled: true,
      backgroundImage: '/images/indian_news_journali_bf547ce9.jpg',
    },
    {
      id: 'bollywood',
      title: 'Bollywood',
      emoji: '🎬',
      description: 'Classic and contemporary Indian cinema',
      sheetUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQDSQLX2XttGTN_wQrtIK_8rfEMwDxx8cnlShmze6z-XQGalPer_3YNrc4jUufSzkk1Av6rP0yRcvcu/pub?gid=1569893815&single=true&output=csv',
      enabled: true,
      backgroundImage: '/images/bollywood_cinema_mov_e6c8b2c3.jpg',
    },
    {
      id: 'restaurants',
      title: 'Restaurants',
      emoji: '🍛',
      description: 'Authentic Indian dining in Paris',
      sheetUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQDSQLX2XttGTN_wQrtIK_8rfEMwDxx8cnlShmze6z-XQGalPer_3YNrc4jUufSzkk1Av6rP0yRcvcu/pub?gid=1744464793&single=true&output=csv',
      enabled: true,
      backgroundImage: '/images/indian_restaurant_fo_123dcf36.jpg',
    },
    {
      id: 'recipes',
      title: 'Recipes',
      emoji: '🍲',
      description: 'Easy Indian recipes for students',
      sheetUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQDSQLX2XttGTN_wQrtIK_8rfEMwDxx8cnlShmze6z-XQGalPer_3YNrc4jUufSzkk1Av6rP0yRcvcu/pub?gid=421492630&single=true&output=csv',
      enabled: true,
      backgroundImage: '/images/indian_cooking_spice_42bc4676.jpg',
    },
    {
      id: 'events',
      title: 'Events',
      emoji: '🎭',
      description: 'Cultural events and celebrations',
      sheetUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQDSQLX2XttGTN_wQrtIK_8rfEMwDxx8cnlShmze6z-XQGalPer_3YNrc4jUufSzkk1Av6rP0yRcvcu/pub?gid=1160517921&single=true&output=csv',
      enabled: true,
      backgroundImage: '/images/indian_festival_cult_d86f9830.jpg',
    },
    {
      id: 'resources',
      title: 'Resources',
      emoji: '📚',
      description: 'Helpful guides and information',
      sheetUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQDSQLX2XttGTN_wQrtIK_8rfEMwDxx8cnlShmze6z-XQGalPer_3YNrc4jUufSzkk1Av6rP0yRcvcu/pub?gid=6162414&single=true&output=csv',
      enabled: true,
      backgroundImage: '/images/india_travel_guide_t_eb81754d.jpg',
    },
    {
      id: 'peoplespeak',
      title: 'PeopleSpeak',
      emoji: '💬',
      description: 'Hear from the community',
      sheetUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQDSQLX2XttGTN_wQrtIK_8rfEMwDxx8cnlShmze6z-XQGalPer_3YNrc4jUufSzkk1Av6rP0yRcvcu/pub?gid=1523155147&single=true&output=csv',
      enabled: true,
      backgroundImage: '/images/people_talking_conve_56dc4ba5.jpg',
    },
    {
      id: 'about',
      title: 'About',
      emoji: 'ℹ️',
      description: 'Learn More About the Developer',
      sheetUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQDSQLX2XttGTN_wQrtIK_8rfEMwDxx8cnlShmze6z-XQGalPer_3YNrc4jUufSzkk1Av6rP0yRcvcu/pub?gid=1083212065&single=true&output=csv',
      enabled: true,
    },
  ],
  
  theme: {
    primaryColor: 'saffron',
    accentColor: 'peacock',
  },
  
  features: {
    enableSearch: true,
    enableFiltering: true,
    cardsPerPage: 8,
  },
}

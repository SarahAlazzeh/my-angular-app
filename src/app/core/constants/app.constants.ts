export const APP_CONSTANTS = {
  ROUTES: {
    HOME: '/home',
    SHOP: '/shop',
    CART: '/cart',
    RECIPE: '/recipe',
    SHARE_RECIPE: '/share-recipe',
    ABOUT: '/about',
    CONTACT: '/contact',
    NOT_FOUND: '/404'
  },
  STORAGE_KEYS: {
    THEME: 'sarah-bakery-theme',
    LANGUAGE: 'sarah-bakery-language',
    CART_ITEMS: 'sarah-bakery-cart',
    FAVORITES: 'sarah-bakery-favorites',
    USER_PREFERENCES: 'sarah-bakery-preferences'
  },
  THEMES: {
    LIGHT: 'light',
    DARK: 'dark'
  },
  LANGUAGES: {
    ENGLISH: 'en',
    ARABIC: 'ar'
  },
  API_ENDPOINTS: {
    PRODUCTS: '/products',
    CART: '/cart',
    FAVORITES: '/favorites',
    RECIPES: '/recipes',
    USERS: '/users'
  }
} as const;

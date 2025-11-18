export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  appName: 'Sarah\'s Bakery',
  version: '1.0.0',
  firebase: {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  },
  features: {
    search: true,
    cart: true,
    favorites: true,
    themes: true,
    languages: ['en', 'ar']
  }
};

// NOTE: This is a template file.
// Copy this to environment.ts and fill in your Firebase credentials.
// Or run 'npm run config:env' to generate from .env file.


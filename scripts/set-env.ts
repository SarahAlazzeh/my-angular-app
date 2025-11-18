import { writeFile, existsSync } from 'fs';
import { resolve } from 'path';

// Read .env file
const envPath = resolve(__dirname, '../.env');
if (!existsSync(envPath)) {
  console.error('Error: .env file not found!');
  console.error('Please create a .env file based on .env.example');
  process.exit(1);
}

// Parse .env file
const fs = require('fs');
const envFile = fs.readFileSync(envPath, 'utf8');
const envVars: { [key: string]: string } = {};

envFile.split('\n').forEach((line: string) => {
  line = line.trim();
  if (line && !line.startsWith('#')) {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      envVars[key.trim()] = valueParts.join('=').trim();
    }
  }
});

// Validate required variables
const requiredVars = [
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MESSAGING_SENDER_ID',
  'FIREBASE_APP_ID',
  'FIREBASE_MEASUREMENT_ID'
];

const missingVars = requiredVars.filter(v => !envVars[v]);
if (missingVars.length > 0) {
  console.error('Error: Missing required environment variables:');
  missingVars.forEach(v => console.error(`  - ${v}`));
  process.exit(1);
}

// Generate environment.ts content
const targetPath = resolve(__dirname, '../src/environments/environment.ts');
const targetPathProd = resolve(__dirname, '../src/environments/environment.prod.ts');

const envConfigFile = `export const environment = {
  production: false,
  apiUrl: '${envVars['API_URL_DEV'] || 'http://localhost:3000/api'}',
  appName: 'Sarah\\'s Bakery',
  version: '1.0.0',
  firebase: {
    apiKey: "${envVars['FIREBASE_API_KEY']}",
    authDomain: "${envVars['FIREBASE_AUTH_DOMAIN']}",
    projectId: "${envVars['FIREBASE_PROJECT_ID']}",
    storageBucket: "${envVars['FIREBASE_STORAGE_BUCKET']}",
    messagingSenderId: "${envVars['FIREBASE_MESSAGING_SENDER_ID']}",
    appId: "${envVars['FIREBASE_APP_ID']}",
    measurementId: "${envVars['FIREBASE_MEASUREMENT_ID']}"
  },
  features: {
    search: true,
    cart: true,
    favorites: true,
    themes: true,
    languages: ['en', 'ar']
  }
};
`;

const envConfigFileProd = `export const environment = {
  production: true,
  apiUrl: '${envVars['API_URL_PROD'] || 'https://api.sarahsbakery.com'}',
  appName: 'Sarah\\'s Bakery',
  version: '1.0.0',
  firebase: {
    apiKey: "${envVars['FIREBASE_API_KEY']}",
    authDomain: "${envVars['FIREBASE_AUTH_DOMAIN']}",
    projectId: "${envVars['FIREBASE_PROJECT_ID']}",
    storageBucket: "${envVars['FIREBASE_STORAGE_BUCKET']}",
    messagingSenderId: "${envVars['FIREBASE_MESSAGING_SENDER_ID']}",
    appId: "${envVars['FIREBASE_APP_ID']}",
    measurementId: "${envVars['FIREBASE_MEASUREMENT_ID']}"
  },
  features: {
    search: true,
    cart: true,
    favorites: true,
    themes: true,
    languages: ['en', 'ar']
  }
};
`;

// Write the files
writeFile(targetPath, envConfigFile, (err: any) => {
  if (err) {
    console.error('Error writing environment.ts:', err);
    process.exit(1);
  }
  console.log('✓ Generated environment.ts');
});

writeFile(targetPathProd, envConfigFileProd, (err: any) => {
  if (err) {
    console.error('Error writing environment.prod.ts:', err);
    process.exit(1);
  }
  console.log('✓ Generated environment.prod.ts');
});

console.log('\nEnvironment files generated successfully!');
console.log('Note: These files are now safe to commit as they no longer contain secrets.');
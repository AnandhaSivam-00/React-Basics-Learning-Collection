import 'dotenv/config';
import { initializeApp, cert } from 'firebase-admin';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const oldServiceAccount = require('./oldServiceAccount.json');
const newServiceAccount = require('./newServiceAccount.json');

export const oldApp = initializeApp({
  credential: cert(oldServiceAccount),
  databaseURL: import.meta.env.VITE_REALTIME_DB_OLD_URL,
}, 'oldApp')

export const newApp = initializeApp({
  credential: cert(newServiceAccount),
  databaseURL: import.meta.env.VITE_REALTIME_DB_NEW_URL,
}, 'newApp')
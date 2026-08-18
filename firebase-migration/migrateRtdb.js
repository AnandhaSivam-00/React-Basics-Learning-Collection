import process from 'process';
import { getDatabase } from 'firebase-admin/database';
import { oldApp, newApp } from './firebaseInit.js';

const oldRtdb = getDatabase(oldApp);
const newRtdb = getDatabase(newApp);

async function migrateRealtimeDatabase() {
  console.log('Fetching root data from old Realtime Database...');
  
  const rootSnapshot = await oldRtdb.ref('/').once('value');
  const rootData = rootSnapshot.val();

  if(!rootData) {
    console.log('No data found in Realtime Database.');
    return;
  }

  const rootKeys = Object.keys(rootData);
  console.log(`Found top-level nodes: ${rootKeys.join(', ')}`);

  for(const key of rootKeys) {
    console.log(`Writing node "/${key}" to new Realtime Database...`);
    const nodeData = rootData[key];
    await newRtdb.ref(`/${key}`).set(nodeData);
    console.log(`Node "/${key}" copied successfully.`);
  }

  console.log('Realtime Database migration finished!');
}

migrateRealtimeDatabase()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Realtime Database migration failed:', err);
    process.exit(1);
  });
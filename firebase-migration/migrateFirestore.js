import process from 'process';
import { getFirestore } from 'firebase-admin/firestore';
import { oldApp, newApp } from './firebaseInit.js';

const oldDb = getFirestore(oldApp);
const newDb = getFirestore(newApp, 'default'); // Replace 'default' with your new project's database name

const BATCH_SIZE = 400; // Safe threshold below 500 limit
let batch = newDb.batch();
let operationCount = 0;
let totalDocsMigrated = 0;

async function commitBatchIfNeeded(force = false) {
  if(operationCount >= BATCH_SIZE || (force && operationCount > 0)) {
    await batch.commit();
    totalDocsMigrated += operationCount;
    console.log(`✓ Committed batch of ${operationCount} documents (Total so far: ${totalDocsMigrated})`);
    batch = newDb.batch();
    operationCount = 0;
  }
}

async function copyCollection(oldCollectionRef, newCollectionRef) {
  const snapshot = await oldCollectionRef.get();

  if(snapshot.empty) {
    return;
  }

  for(const doc of snapshot.docs) {
    const newDocRef = newCollectionRef.doc(doc.id);
    
    // Copy parent document
    batch.set(newDocRef, doc.data());
    operationCount++;
    await commitBatchIfNeeded();

    // Check for nested subcollections recursively
    const subcollections = await doc.ref.listCollections();
    for(const subcol of subcollections) {
      const newSubcolRef = newDocRef.collection(subcol.id);
      await copyCollection(subcol, newSubcolRef);
    }
  }
}

async function migrateFirestore() {
  console.log('Fetching collections from old project...');
  const rootCollections = await oldDb.listCollections();

  if(rootCollections.length === 0) {
    console.log('No collections found in the old database.');
    return;
  }

  for(const col of rootCollections) {
    console.log(`--> Starting migration for collection: "${col.id}"`);
    const newColRef = newDb.collection(col.id);
    await copyCollection(col, newColRef);
    console.log(`✓ Finished collection: "${col.id}"`);
  }

  // Commit any leftover writes
  await commitBatchIfNeeded(true);
  console.log(`\n🎉 Firestore migration complete! Total documents copied: ${totalDocsMigrated}`);
}

migrateFirestore()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Firestore migration failed with error:', err);
    process.exit(1);
  });
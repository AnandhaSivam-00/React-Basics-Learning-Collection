import process from 'process';
import { getStorage } from 'firebase-admin/storage';
import { oldApp, newApp } from './firebaseInit.js';

// Explicitly target the bucket on each project
const oldBucket = getStorage(oldApp).bucket('YOUR_OLD_PROJECT_ID.appspot.com');
const newBucket = getStorage(newApp).bucket('YOUR_NEW_PROJECT_ID.firebasestorage.app');

async function migrateStorageFiles() {
  console.log(`Listing files from old bucket: "${oldBucket.name}"...`);
  
  // getFiles() returns an array where the first element is the list of File objects
  const [files] = await oldBucket.getFiles();

  if (!files || files.length === 0) {
    console.log('No files found in the old storage bucket.');
    return;
  }

  console.log(`Found ${files.length} file(s). Starting stream transfer...\n`);

  let successCount = 0;
  let failCount = 0;

  for (const file of files) {
    // Skip empty folder markers if present
    if (file.name.endsWith('/')) continue;

    console.log(`Copying: ${file.name}`);

    try {
      // Get original file metadata (content type, custom metadata)
      const [metadata] = await file.getMetadata();
      const newFile = newBucket.file(file.name);

      // Stream file directly from old bucket to new bucket
      await new Promise((resolve, reject) => {
        file.createReadStream()
          .pipe(newFile.createWriteStream({
            metadata: {
              contentType: metadata.contentType,
              metadata: metadata.metadata || {}
            },
            resumable: false
          }))
          .on('finish', resolve)
          .on('error', reject);
      });

      successCount++;
      console.log(`✓ Copied: ${file.name}`);
    } catch (err) {
      failCount++;
      console.error(`✗ Failed to copy ${file.name}:`, err.message);
    }
  }

  console.log(`\n🎉 Storage migration finished! (${successCount} succeeded, ${failCount} failed)`);
}

migrateStorageFiles()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Storage migration crashed:', err);
    process.exit(1);
  });
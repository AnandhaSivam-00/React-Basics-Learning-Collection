import { getAuth } from 'firebase-admin/auth';
import 'dotenv/config';
import process from 'node:process';
import { Buffer } from 'node:buffer';
import { oldApp, newApp } from './firebaseInit.js';

const oldAuth = getAuth(oldApp);
const newAuth = getAuth(newApp);

const hashOptions = {
    hash: {
        algorithm: 'SCRYPT',
        // Replace this string with your old project's base64_signer_key:
        key: Buffer.from(process.env.VITE_BASE64_SIGNER_KEY, 'base64'),
        // Replace if your console shows a different salt separator (default is usually 'B4A=='):
        saltSeparator: Buffer.from(process.env.VITE_BASE64_SALT_SEPARATOR, 'base64'),
        rounds: 8,
        memoryCost: 14,
    },
};

async function migrateUsers(nextPageToken) {
    const result = await oldAuth.listUsers(1000, nextPageToken);

    if(result.users.length === 0) {
        console.log('No users found to migrate.');
        return;
    }

    // Format users for the new project import
    const usersToImport = result.users.map((user) => {
        const userRecord = {
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            displayName: user.displayName,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL && user.photoURL.length > 0 ? user.photoURL : undefined,
            disabled: user.disabled,
            customClaims: user.customClaims,
        };

        // Attach password hash and salt only if the user has an email/password account
        if(user.passwordHash) {
            userRecord.passwordHash = Buffer.from(user.passwordHash, 'base64');
        }
        if(user.passwordSalt) {
            userRecord.passwordSalt = Buffer.from(user.passwordSalt, 'base64');
        }

        return userRecord;
    });

    try {
        // Pass hashOptions as the second argument
        const importResult = await newAuth.importUsers(usersToImport, hashOptions);
        console.log(`Successfully migrated ${importResult.successCount} users.`);

        if(importResult.failureCount > 0) {
            console.error(`Failed to migrate ${importResult.failureCount} users:`);
            importResult.errors.forEach((err) => {
                console.error(`- Index ${err.index}: ${err.error.message}`);
            });
        }
    }
    catch(error) {
        console.error('Import error:', error);
    }

    // Handle pagination if there are more than 1,000 users
    if(result.pageToken) {
        await migrateUsers(result.pageToken);
    }
}

(async () => {
    try {
        console.log('Starting Authentication migration...');
        await migrateUsers();
        console.log('Authentication migration finished!');
        process.exit(0);
    }
    catch(error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
})();
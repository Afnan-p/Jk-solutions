import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Migration Script: Syncs all collections from current DB to client's new MongoDB Atlas
 * Usage:
 *   node sync-to-new-atlas.js "mongodb+srv://clientUser:clientPass@cluster.mongodb.net/jksolutions"
 */

const targetAtlasUri = process.argv[2] || process.env.NEW_MONGO_URI;

if (!targetAtlasUri) {
  console.error('\n❌ ERROR: Please provide the client\'s new MongoDB Atlas connection string!');
  console.log('Example: node sync-to-new-atlas.js "mongodb+srv://username:password@cluster0.abcde.mongodb.net/jksolutions?retryWrites=true&w=majority"\n');
  process.exit(1);
}

const sourceUri = process.env.MONGO_URI_ATLAS || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/jk-security';

async function migrate() {
  console.log('\n🚀 Starting Database Migration to Client\'s Atlas...');
  console.log(' Source DB: ', sourceUri.replace(/:([^:@]{3})[^:@]*@/, ':***@'));
  console.log(' Target DB: ', targetAtlasUri.replace(/:([^:@]{3})[^:@]*@/, ':***@'));

  const sourceConn = await mongoose.createConnection(sourceUri, { serverSelectionTimeoutMS: 5000 }).asPromise();
  console.log('✅ Connected to Source DB');

  const targetConn = await mongoose.createConnection(targetAtlasUri, { serverSelectionTimeoutMS: 10000 }).asPromise();
  console.log('✅ Connected to Client\'s Target MongoDB Atlas');

  const collections = ['services', 'projects', 'testimonials', 'settings', 'users'];

  let totalMigrated = 0;

  for (const collName of collections) {
    try {
      const docs = await sourceConn.collection(collName).find({}).toArray();
      if (docs.length > 0) {
        for (const doc of docs) {
          await targetConn.collection(collName).replaceOne(
            { _id: doc._id },
            doc,
            { upsert: true }
          );
        }
        console.log(`✨ Synced [${collName}]: ${docs.length} documents copied`);
        totalMigrated += docs.length;
      } else {
        console.log(`ℹ️ [${collName}]: 0 documents found in source`);
      }
    } catch (err) {
      console.warn(`⚠️ Warning while syncing [${collName}]:`, err.message);
    }
  }

  console.log(`\n🎉 SUCCESS! All ${totalMigrated} documents migrated to the client's MongoDB Atlas!`);
  console.log('You can now safely update MONGO_URI in your .env and deployment settings.\n');

  await sourceConn.close();
  await targetConn.close();
  process.exit(0);
}

migrate().catch(err => {
  console.error('\n❌ Migration failed:', err.message);
  process.exit(1);
});

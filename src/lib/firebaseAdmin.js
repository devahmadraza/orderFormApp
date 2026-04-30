import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let firebaseAdminApp;
let dbInstance;

function getFirebaseAdminConfig() {
  const {
    FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY,
  } = process.env;

  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
    throw new Error("Missing Firebase Admin environment variables.");
  }

  return {
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  };
}

function initializeFirebaseAdmin() {
  if (!firebaseAdminApp) {
    firebaseAdminApp = getApps()[0] || initializeApp({
      credential: cert(getFirebaseAdminConfig()),
    });
  }
  return firebaseAdminApp;
}

function getDbInstance() {
  if (!dbInstance) {
    initializeFirebaseAdmin();
    dbInstance = getFirestore(firebaseAdminApp);
  }
  return dbInstance;
}

// Export a getter function instead of the direct instance
export const db = new Proxy({}, {
  get(target, prop) {
    const db = getDbInstance();
    return db[prop];
  }
});

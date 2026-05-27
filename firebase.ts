/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Safe environment keys checking
const config = {
  apiKey: (import.meta as any).env?.VITE_FIREBASE_API_KEY || "",
  authDomain: (import.meta as any).env?.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: (import.meta as any).env?.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: (import.meta as any).env?.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: (import.meta as any).env?.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: (import.meta as any).env?.VITE_FIREBASE_APP_ID || ""
};

let app;
let auth: any = null;
let db: any = null;
let isFirebaseReady = false;

// Only initialize if minimum keys exist
if (config.apiKey && config.projectId) {
  try {
    app = getApps().length === 0 ? initializeApp(config) : getApps()[0];
    auth = getAuth(app);
    db = getFirestore(app);
    isFirebaseReady = true;
    console.log("🔥 Firebase initialized successfully!");
  } catch (error) {
    console.warn("⚠️ Firebase connection failed to initialize. Falling back to Local Mode:", error);
  }
} else {
  console.info("ℹ️ No VITE_FIREBASE_API_KEY provided. Operating in Pinterest Luxury 'Local Play Mode'. All data saved directly on your device!");
}

export { auth, db, isFirebaseReady };

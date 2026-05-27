# YeEgna (የኛ) 💍🇪🇹 - Couples Finance Staircase

YeEgna ("Ours" in Amharic) is a premium, Pinterest-soft luxury couples finance application designed specifically for Ethiopian couples. It helps partners manage money together in a simple, romantic, and supportive way—improving financial transparency, coordinate spending plans, and track collaborative future dreams together!

---

## 🎨 Design Philosophy & Features

- **The Soft Luxury Theme**: Uses eye-safe pink-and-blue romantic gradients, custom card layouts, and rounded inputs styled specifically for one-handed mobile phone usage.
- **The Money Staircase**: Displays an animated interactive illustration of a couple hand-in-hand climbing gold steps representing mutual growth.
- **Wife vs. Husband Wallets**: Displays personal balances as well as a centralized, joint "Our Money" collective space.
- **Simple, Non-Intimidating Vocabulary**: No elite corporate banking terms!
  - *Income* ➡️ **Money In**
  - *Expense* ➡️ **Money Out**
  - *Savings Goal* ➡️ **Dream Goal**
  - *Reports* ➡️ **Monthly Summary**
- **AI-Powered Advice Engine**: Scans your categories in real-time to alert you of peak expenses and offer smart, warm, romantic tips to optimize savings.
- **Real-Time Synchronized Database**: Set up Firebase in minutes or play immediately on your device using the dynamic Offline-First Local Play Mode, which preserves entire databases on page refresh!

---

## 📁 Project Folder Structure

All required files are organized under a pristine Vite framework structure matching Vercel's automatic recognition capabilities:

- `package.json` (Root level): Manages and locks all active libraries (React, Tailwind CSS v4, Framer Motion, Lucide icons, Firebase).
- `vite.config.ts` (Root level): Configures and runs the rapid local development server.
- `tsconfig.json` (Root level): Establishes strict TypeScript compilation rules.
- `vercel.json` (Root level): Configures Vercel's core routers to prevent 404 errors during client-side SPA transitions.
- `/src` Folder: Contains the core typescript code modules:
  - `/src/types.ts`: Global TypeScript data models.
  - `/src/firebase.ts`: Dual-sync Firebase initialization setup helper.
  - `/src/components/`: Modular widgets:
    - `AnimatedStaircase.tsx`: Beautiful hand-holding SVG illustration climb animation.
    - `AddActivityModal.tsx`: Simple addition popup sheet.
    - `Navigation.tsx`: Ergonomic mobile bottom navigation bar with middle heart FAB.
  - `/src/pages/`: Rich screen layouts (Dashboard, Activities log, Goal trackers, summaries, Updates, Profile settings).
- `firestore.rules`: Zero-Trust Attribute-Based security access controls mapped for Firestore.
- `firebase-blueprint.json`: Data structure blueprint representations (IR).

---

## 📱 Mobile-Friendly Phone Upload & Deployment Guide

You can easily upload this project to GitHub and host it live on Vercel using your Android phone for free in just 5 minutes!

### Step 1: Upload Your Code to GitHub (From your Phone)
1. Zip this entire directory on your phone (usually built-in via the "Files" or "My Files" Android app). Ensure `package.json` is located directly in the root of the ZIP file—not nested inside another sub-folders!
2. Go to **[GitHub.com](https://github.com)** on your phone's browser (e.g., Google Chrome). If you don't have an account, register one in 1 minute.
3. Tap the **`+` (New)** button at the top to create a new Repository.
4. Name your repo `YeEgna` and select **Public**, then tap **Create Repository**.
5. Switch your phone browser to **"Desktop Site"** mode (tap Chrome's 3-dot menu at the top right and check "Desktop site").
6. On your empty repo homepage, tap the link that says **"uploading an existing file"**.
7. Tap **Choose your files**, select your zipped folder, and upload it. Tap **Commit changes** to save.

### Step 2: Deploy Live to Vercel (From your Phone)
1. Go to **[Vercel.com](https://vercel.com)** on your phone and Sign Up or Log In using your GitHub account with 1 tap.
2. Tap the **`Add New...`** button and select **`Project`**.
3. Under the list of repositories, find your **`YeEgna`** project and tap **`Import`**.
4. Leave all settings (Framework Preset is automatically detected as *Vite*, Build Command is *npm run build*, and Output Directory is *dist*) as default!
5. Tap **`Deploy`**.
6. Wait 1 minute. Your phone screen will display a confetti burst with the live link to your beautiful YeEgna app! You can share this link with your partner instantly!

### Step 3: Connect Firebase (Optional)
To replace the Local Play Mode with cloud synchronization so your partner's changes show up in real-time:
1. Go to your **Vercel Project Dashboard** ➡️ **Settings** ➡️ **Environment Variables** on your phone.
2. Add the following Keys with their matching values from your Firebase Project Console:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
3. Tap save. Vercel will redeploy your app automatically, and your real-time cloud couple database is fully live!

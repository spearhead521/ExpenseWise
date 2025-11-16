// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  "projectId": "studio-4257982084-6f16b",
  "appId": "1:66996488862:web:71e3425bea21b5703f498f",
  "apiKey": "AIzaSyAbrNcMLH9rbjjkwcaVPNkxsVqtcSkg7M0",
  "authDomain": "studio-4257982084-6f16b.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "66996488862"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };

import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth" 
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyBMUGnZG7u7M0IukRux7occUsThPZpHjeU",
  authDomain: "ecrapp807fd.firebaseapp.com",
  projectId: "ecrapp807fd",
  storageBucket: "ecrapp807fd.firebasestorage.app",
  messagingSenderId: "1036836896807",
  appId: "1:1036836896807:web:010541a89aa5270d374e02",
  measurementId: "G-ZHWKGR8H5Q"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const analytics = getAnalytics(app);    
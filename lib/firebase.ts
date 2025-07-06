import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { Auth, getAuth, initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorge from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyD3lkB4g2VxLl8cOMvPihbIC3S8LKh0w8I",
  authDomain: "netflix-moblie.firebaseapp.com",
  projectId: "netflix-moblie",
  storageBucket: "netflix-moblie.firebasestorage.app",
  messagingSenderId: "224446765120",
  appId: "1:224446765120:web:2ba088799737266c96e7a5",
};

let app: FirebaseApp;
let auth: Auth;

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorge),
    });
  } catch (error) {
    console.error("Firebase initialization error", error);
  }
} else {
  app = getApp();
  auth = getAuth();
}

export { auth };

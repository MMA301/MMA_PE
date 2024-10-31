// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
let firebaseApp;
export const getFirebaseApp = () => {
  if (firebaseApp) {
    return firebaseApp;
  }

  const firebaseConfig = {
    apiKey: "AIzaSyD3Psz2ozjKFJdtZrUm804dGo2NeObjQLQ",
    authDomain: "dmvinh-lonnhua.firebaseapp.com",
    databaseURL:
      "https://dmvinh-lonnhua-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dmvinh-lonnhua",
    storageBucket: "dmvinh-lonnhua.appspot.com",
    messagingSenderId: "134756817214",
    appId: "1:134756817214:web:1cee8a51d3e6b79334b46f",
    measurementId: "",
  };

  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

  initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });

  firebaseApp = app;

  return app;
};

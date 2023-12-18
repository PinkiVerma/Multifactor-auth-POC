import { FirebaseApp, getApps, initializeApp, getApp } from "@firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB4KqmUOt1wl6wHt1Q1Ftv5Xa1g-tF8TeQ",
  authDomain: "login-mfa-bdd6d.firebaseapp.com",
  projectId: "login-mfa-bdd6d",
  storageBucket: "login-mfa-bdd6d.appspot.com",
  messagingSenderId: "239114437327",
  appId: "1:239114437327:web:0049f898cf23fbe70cedba",
};

let app: FirebaseApp;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export {app};
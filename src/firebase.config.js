import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC6UJp0qADkO4JPAk1s5DIqKRX4NrS2OwE',
  authDomain: 'oriri-b04f3.firebaseapp.com',
  databaseURL: 'https://oriri-b04f3-default-rtdb.firebaseio.com',
  projectId: 'oriri-b04f3',
  storageBucket: 'oriri-b04f3.appspot.com',
  messagingSenderId: '213554350286',
  appId: '1:213554350286:web:bac7f7e8f4b894569ae89f',
};

const app = getApps.Length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };

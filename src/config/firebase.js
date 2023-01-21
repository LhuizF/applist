import { initializeApp } from 'firebase/app';
import { firestore } from '../../config.json';

const firebaseConfig = {
  apiKey: firestore.api_key,
  authDomain: firestore.auth_domain,
  projectId: firestore.project_id,
  storageBucket: firestore.storage_bucket,
  messagingSenderId: firestore.messaging_sender_id,
  appId: firestore.app_id
};

const app = initializeApp(firebaseConfig);

export default app;

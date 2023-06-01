import { initializeApp } from 'firebase/app';
import { firestore as config } from '../../config.json';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: config.api_key,
  authDomain: config.auth_domain,
  projectId: config.project_id,
  storageBucket: config.storage_bucket,
  messagingSenderId: config.messaging_sender_id,
  appId: config.app_id
};

const app = initializeApp(firebaseConfig);

export default app;

export const database = getDatabase(app);

export const firestore = getFirestore(app);


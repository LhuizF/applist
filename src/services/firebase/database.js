import app from '../../config/firebase';
import { getFirestore, collection, getDocs, addDoc, query, where } from 'firebase/firestore/lite';

class Database {
  constructor(app) {
    this.db = getFirestore(app);
  }

  async getCollections(collectionName) {
    try {
      const data = await getDocs(collection(this.db, collectionName));

      return data.docs.map(doc => doc.data());

    } catch (e) {
      console.log(e);

      return [];
    }
  }

  async createCollection(collectionName, id, data) {
    try {
      const docRef = await addDoc(collection(this.db, collectionName, id), data);

      return docRef.id;

    } catch (e) {
      console.log(e);

      return null;
    }
  }

  async simpleFind(collectionName, dataQuery) {
    try {
      const collectionRef = collection(this.db, collectionName)

      const [q] = Object.keys(dataQuery).map(key => {
        return query(collectionRef, where(key, '==', dataQuery[key]))
      })

      const querySnapshot = await getDocs(q)
      const [user] = querySnapshot.docs.map(doc => doc.data())

      return user
    } catch (e) {
      console.log(e);

      return null
    }
  }
}

export default new Database(app);
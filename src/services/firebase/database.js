import app from '../../config/firebase';
import { getFirestore, collection, getDocs, addDoc, query, where, doc, getDoc } from 'firebase/firestore/lite';

class Database {
  constructor(app) {
    this.db = getFirestore(app);
  }

  async getCollections(collectionName) {
    try {
      const data = await getDocs(collection(this.db, collectionName));

      return data.docs.map(doc => doc.data());

    } catch (e) {
      console.log('getCollections', e);

      return [];
    }
  }

  async createCollection(collectionName, data) {
    try {
      const docRef = await addDoc(collection(this.db, collectionName), data);

      return docRef.id;

    } catch (e) {
      console.log('createCollection', e);

      return null;
    }
  }

  async FindOne(collectionName, dataQuery) {
    try {
      const collectionRef = collection(this.db, collectionName);

      const [q] = Object.keys(dataQuery).map(key => {
        return query(collectionRef, where(key, '==', dataQuery[key]))
      });

      const querySnapshot = await getDocs(q)
      const [item] = querySnapshot.docs.map(doc => doc.data())

      return item
    } catch (e) {
      console.log('FindOne', e);

      return null
    }
  }

  async findMore(collectionName, dataQuery, operator = '==') {
    try {
      const collectionRef = collection(this.db, collectionName);

      const [q] = Object.keys(dataQuery).map(key => {
        return query(collectionRef, where(key, operator, dataQuery[key]))
      });

      const querySnapshot = await getDocs(q)
      const items = querySnapshot.docs.map(doc => doc.data())

      return items
    } catch (e) {
      console.log('findMore', e);

      return null
    }
  }

  async findById(collectionName, id) {
    try {
      const userRef = doc(this.db, collectionName, id)
      const docUser = await getDoc(userRef)
      return docUser.data()
    } catch (e) {
      console.log('findById', e);

      return null
    }
  }

}

export default new Database(app);

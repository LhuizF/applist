import { get, push, ref } from 'firebase/database';
import { database } from '../config/firebase'
import dbRealTime from '@react-native-firebase/database';



class Firebase {
  constructor(database, firestore) {
    this.database = database;
    this.firestore = firestore;
  }

  async createList(listData) {
    const databaseRef = ref(this.database);

    return push(databaseRef, listData)
      .then((newRef) => {
        console.log('Chave gerada:', newRef.key);
        return newRef.key;
      })
      .catch((error) => {
        console.error('Erro ao adicionar dado:', error);
        return null;
      });
  }

  // async getListsByUserId(userId) {
  //   const databaseRef = ref(this.database);

  //   const userList = [];

  //   await get(databaseRef).then((snapshot) => {
  //     if (snapshot.exists()) {
  //       snapshot.forEach((childSnapshot) => {
  //         const listData = childSnapshot.val();
  //         const users = listData.users;
  //         if (users && Object.values(users).includes(userId)) {
  //           userList.push(listData);
  //         }
  //       });
  //     }
  //   })

  //   return userList;
  // }

  async getListsByUserId(userId, setList) {

    dbRealTime().ref('/').on('value', snapshot => {
      const listData = snapshot.val();
      const listArray = []

      Object.keys(listData).forEach((key) => {
        if (listData[key].users && listData[key].users.includes(userId)) {
          listArray.push(listData[key])
        }
      })

      setList(listArray)
    })
  }
}


export default new Firebase(database);

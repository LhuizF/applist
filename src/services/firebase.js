import { get, push, ref, child, update } from 'firebase/database';
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

      if (!!listData) {
        Object.keys(listData).forEach((key) => {
          if (listData[key].users && listData[key].users.includes(userId)) {
            listArray.push({ key, ...listData[key] })
          }
        })
        setList(listArray)
      }
    })
  }

  async insertItem(listId, item) {
    const databaseRef = ref(this.database, listId);

    get(databaseRef).then((snapshot) => {

      if (snapshot.exists()) {
        const listData = snapshot.val();
        const items = listData?.items || [];

        const listRef = ref(this.database, listId + '/items');

        push(listRef, item).then((newRef) => {
          console.log('Chave gerada:', newRef.key);
          return newRef.key;
        }).catch((error) => {
          console.error('Erro ao adicionar dado:', error);
          return null;
        })

      }

    }).then(() => {
      return true
    }).catch((error) => {
      console.error("Ocorreu um erro ao obter o último ID:", error);
      return false;
    });

  }

  async findItensByListId(listId, setItems) {
    const databaseRef = ref(this.database, listId);

    get(databaseRef).then((snapshot) => {
      if (snapshot.exists()) {
        const listData = snapshot.val();
        const items = listData?.items || {};
        const itemsArray = []

        Object.keys(items).forEach((key) => {
          itemsArray.push({ key, ...items[key] })
        })
        setItems(itemsArray)
      }
    })
  }

  async checkItem({ listId, itemId, checked }) {
    const itemRef = ref(this.database, listId + '/items/' + itemId);

    const data = {
      checked: checked,
      completeDate: checked ? new Date().toISOString() : '',
    }

    update(itemRef, data).then(() => {
      console.log('Item atualizado com sucesso!');
    }).catch((error) => {
      console.error('Erro ao atualizar item:', error);
    });
  }

  async joinList({ listId, userId }) {
    const listRef = ref(this.database, listId + '/users');

    return get(listRef).then((snapshot) => {
      if (snapshot.exists()) {
        const users = snapshot.val();
        const usersArray = Object.values(users) || [];

        if (!usersArray.includes(userId)) {
          usersArray.push(userId);

          const objUser = Object.assign({}, usersArray);

          return update(listRef, objUser).then(() => {
            console.log('Usuário adicionado com sucesso!');
            return true
          }).catch((error) => {
            console.error('Erro ao adicionar usuário:', error);
            return false
          });
        }
      }

      return false
    })
  }
}


export default new Firebase(database);

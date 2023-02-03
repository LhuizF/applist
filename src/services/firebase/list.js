
import { uuidv4 } from '@firebase/util';
import Database from './database';
import listUser from './UserList';

class List {
  constructor(db, listUser) {
    this.db = db;
    this.listUser = listUser;
  }

  async createList(data) {
    const requiredFields = ['name', 'userId'];
    const errors = [];

    for (const field of requiredFields) {
      if (!data[field]) {
        errors.push(`${field} is required`)
      }
    }

    if (errors.length > 0) {
      return {
        status: 'error',
        message: errors
      }
    }

    const uuid = uuidv4();

    const list = {
      id: uuid,
      name: data.name,
      description: data.description || '',
      created_at: new Date()
    }

    await this.db.createCollection(`lists`, list);

    const listUser = {
      listId: uuid,
      userId: data.userId,
    }

    await this.listUser.createListUser(listUser);
    return {
      status: 'success',
      message: 'Lista criada com sucesso'
    }
  }
}

export default new List(Database, listUser);

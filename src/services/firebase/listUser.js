import Database from './database';

class ListUser {
  constructor(db){
    this.db = db;
  }

  async createListUser(data) {
    const requiredFields = ['listId', 'userId'];
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

    const listUser = {
      listId: data.listId,
      userId: data.userId,
      created_at: new Date()
    }

    const docRef = await this.db.createCollection(`listUser`, listUser);

    return {
      status: 'success',
    }
  }
}

export default new ListUser(Database);

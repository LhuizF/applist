import Database from './database';

class UserList {
  constructor(db) {
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

    await this.db.createCollection(`user_list`, listUser);

    return {
      status: 'success',
    }
  }

  async getListsByUserId(userId) {
    const listUser = await this.db.findMore('user_list', { userId })

    const listsId = listUser.map(list => list.listId)

    const lists = await this.db.findMore('lists', { id: listsId }, 'in')

    const listFormatted = lists.map(list => ({
      id: list.id,
      name: list.name,
      description: list.description,
      created_at: list.created_at.toDate()
    }))

    return {
      status: 'success',
      data: listFormatted
    }

  }
}

export default new UserList(Database);

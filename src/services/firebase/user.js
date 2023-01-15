import { Buffer } from "buffer";
import Database from './database';

class User {
  constructor(database) {
    this.Database = database;
  }

  async verifyUser(query) {
    const user = await this.Database.simpleFind('users', query);

    if(!user) return null;

    return {
      ...user,
      created_at: user.created_at.toDate()
    }
  }

  async getUser(id) {
    const docs = await this.Database.getCollections('users');
    const user = docs.where('id', '==', id).get()
    return user;
  }

  async createUser(data) {
    if (!data) {
      return {
        status: 'error',
        message: 'Data is required'
      }
    }
    const requiredFields = ['id', 'name', 'email', 'picture']
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

    const user = {
      name: data.name,
      email: data.email,
      image: data.picture,
      created_at: new Date()
    }

    const id = Buffer.from(`${data.id}`).toString(40)


    const docRef = await this.Database.createCollection('users', id, user);

    if (!docRef) {
      return {
        status: 'error',
        message: 'Something went wrong'
      }
    }

    return {
      status: 'success',
      message: docRef
    };
  }

  async loginUser(data) {
    if (!data) {
      return {
        status: 'error',
        message: 'Data is required'
      }
    }

    const userExists = await this.verifyUser({ id: data.id });

    if(!!userExists) return userExists;

    const user = await this.createUser(data);

    return user;
  }
}

export default new User(Database);


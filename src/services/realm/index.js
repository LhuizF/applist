import Realm from 'realm';

const UserSchema = {
  name: 'User',
  properties: {
    _id: 'string',
    name: 'string',
    email: 'string',
    image: 'string',
    token: 'string',
    created_at: 'date'
  },
  primaryKey: '_id',
}

class RealmDb {
  constructor() {
    this.realm = Realm.open({
      path: 'local.realm',
      schema: [UserSchema]
    });
  }

  async getUser() {
    const realm = await this.realm;
    const [docs] = realm.objects('User');

    return docs;
  }

  async saveUser(data) {
    if (!data) return false;

    const requiredFields = ['id', 'name', 'email', 'image', 'created_at'];
    let error = false;
    for (const field of requiredFields) {
      if (!data[field]) {
        error = true;
      }
    }

    if (error) return false;

    const realm = await this.realm;
    realm.write(() => {
      realm.create('User', data);
    })

    realm.close();
    console.log('SAVED');
    return true;
  }
}

export default new RealmDb();

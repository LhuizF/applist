import AsyncStorage from '@react-native-async-storage/async-storage';

class LocalStorage {
  constructor(AsyncStorage) {
    this.AsyncStorage = AsyncStorage;
  }

  async setItem(key, value) {
    try {
      const isObject = typeof value === 'object';
      const valueToStore = isObject ? JSON.stringify(value) : value;
      await this.AsyncStorage.setItem(key, valueToStore);
    } catch (error) {
      console.log(error);
    }
  }

  async getItem(key) {
    try {
      const value = await this.AsyncStorage.getItem(key);
      const isObject = value && value[0] === '{';
      const valueToReturn = isObject ? JSON.parse(value) : value;
      return valueToReturn;
    } catch (error) {
      console.log(error);
    }
  }

  async removeItem(key) {
    try {
      await this.AsyncStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new LocalStorage(AsyncStorage);

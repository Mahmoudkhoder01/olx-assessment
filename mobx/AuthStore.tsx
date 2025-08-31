import { action, makeObservable, observable } from 'mobx';
import * as SecureStore from 'expo-secure-store';

class AuthStore {
  accessToken: string = '';

  constructor() {
    makeObservable(this, {
      accessToken: observable,
      setToken: action.bound,
      clearToken: action.bound,
    });

    this.isLoggedIn();
  }

  setToken(token: string) {
    this.accessToken = token;
  }

  clearToken() {
    this.accessToken = '';
  }

  async isLoggedIn() {
    const token = await SecureStore.getItemAsync('accessToken');

    if (token) {
      this.setToken(token);
    }
  }
}

export const authStore = new AuthStore();

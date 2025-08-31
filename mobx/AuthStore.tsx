import { action, makeObservable, observable } from 'mobx';

class AuthStore {
  accessToken: string = '';

  constructor() {
    makeObservable(this, {
      accessToken: observable,
      setToken: action.bound,
      clearToken: action.bound,
    });
  }

  setToken(token: string) {
    this.accessToken = token;
  }

  clearToken() {
    this.accessToken = '';
  }
}

export const authStore = new AuthStore();

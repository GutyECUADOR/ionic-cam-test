import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';


@Injectable({
  providedIn: 'root'
})
export class UserData {
  favorites: string[] = [];
  HAS_LOGGED_IN = 'true';
  HAS_SEEN_TUTORIAL = 'true';

  constructor() { }

  hasFavorite(sessionName: string): boolean {
    return (this.favorites.indexOf(sessionName) > -1);
  }

  addFavorite(sessionName: string): void {
    this.favorites.push(sessionName);
  }

  removeFavorite(sessionName: string): void {
    const index = this.favorites.indexOf(sessionName);
    if (index > -1) {
      this.favorites.splice(index, 1);
    }
  }

  login(data: any) { //HAS_LOGGED_IN
      Preferences.set({
        key: 'HAS_LOGGED_IN',
        value: 'true',
      });
      this.setUsername(data.user.name);
      this.setToken(data.access_token);
      window.dispatchEvent(new CustomEvent('user:login'));
   
  }

  async signup(data: any) {
    Preferences.set({
      key: 'HAS_LOGGED_IN',
      value: 'true',
    });
    await this.setUsername(data.user.name);
    await this.setToken(data.access_token);
    window.dispatchEvent(new CustomEvent('user:signup'));
   
  }

  async logout() { //HAS_LOGGED_IN
    await Preferences.remove({ key: 'HAS_LOGGED_IN' });
    await Preferences.remove({ key: 'access_token' });
    window.dispatchEvent(new CustomEvent('user:logout'));
  
  }

  setUsername(username: string) { //username
    Preferences.set({key: 'username', value: username});
  }

  async getUsername() {
    const { value } = await Preferences.get({ key: 'username' });
    return value;
  }

  setToken(access_token: string) {
    Preferences.set({key: 'access_token', value: access_token});
  }

  async getToken() {
    const { value } = await Preferences.get({ key: 'access_token' });
    return value;
  }

  async isLoggedIn(): Promise<boolean> { //HAS_LOGGED_IN
    const { value } = await Preferences.get({ key: 'HAS_LOGGED_IN' });
    if (value) {
      return true;
    }
    return false;
  }

  async checkHasSeenTutorial() { //HAS_SEEN_TUTORIAL
    const { value } = await Preferences.get({ key: 'HAS_SEEN_TUTORIAL' });
    if (value) {
      return true;
    }
    return false;
  }
}

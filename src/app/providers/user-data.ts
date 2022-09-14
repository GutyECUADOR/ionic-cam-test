import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { IUser } from './../interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class UserData {
  favorites: string[] = [];
  
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

  login(data: any) { 
      Preferences.set({
        key: 'hasLoggedIn',
        value: 'true',
      });
      this.setUser(data);
      this.setToken(data.access_token);
      window.dispatchEvent(new CustomEvent('user:login'));
   
  }

  async signup(data: any) {
    Preferences.set({
      key: 'hasLoggedIn',
      value: 'true',
    });
    this.setUser(data);
    this.setToken(data.access_token);
    window.dispatchEvent(new CustomEvent('user:signup'));
   
  }

  async logout() { 
    Preferences.clear().then(() => {
      window.dispatchEvent(new CustomEvent('user:logout'));
    })
  }

  setUser(user: object) {
    Preferences.set({key: 'user', value: JSON.stringify(user)});
  }

  async getUser(){
    const { value } = await Preferences.get({ key: 'user' });
    console.log(JSON.parse(value));
    return JSON.parse(value);
  }

  setToken(access_token: string) {
    Preferences.set({key: 'access_token', value: access_token});
  }

  async getToken() {
    const { value } = await Preferences.get({ key: 'access_token' });
    return value;
  }

  async isLoggedIn(): Promise<boolean> { 
    const { value } = await Preferences.get({ key: 'hasLoggedIn' });
    if (value) {
      return true;
    }
    return false;
  }

  async checkHasSeenTutorial() { //HAS_SEEN_TUTORIAL
    const { value } = await Preferences.get({ key: 'hasSeenTutorial' });
    if (value) {
      return true;
    }
    return false;
  }
}

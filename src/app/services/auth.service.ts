import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';

@Injectable()
export class AuthService {

  authenticated: boolean;

  @Output()
  public authenticatedStatus = new EventEmitter<boolean>();
  
  public user: string;
  public password: string;
  initialCheck: any;

  constructor(private http: HttpClient, private settings: SettingsService) {
    this.restore();
  }

  public isAuthenticated(): boolean {
    if (!this.initialCheck) {
      this.checkAuth();
      this.initialCheck = true;
    }
    return this.authenticated;
  }

  public login(name: string, pw: string) {
    this.user = name;
    this.password = pw;
    this.checkAuth();
  }

  public logout() {
    delete this.user;
    delete this.password;
    this.clear();
    this.authenticated = false;
    this.authenticatedStatus.emit(false);
  }


  checkAuth() {
    this.http.get(this.settings.getSettings().restBaseUrl + '/players/me').subscribe((player: any) => {
      this.authenticated = true;
      this.user = player.nickName;
      this.store();
      this.authenticatedStatus.emit(true);

    }, err => {
      console.warn('Authentication failed', err);
      this.authenticated = false;
      delete this.user;
      this.clear();
      this.authenticatedStatus.emit(false);
    });
  }

  store() {
    localStorage.setItem('user', this.user);
    localStorage.setItem('password', this.password);
  }

  clear() {
    localStorage.removeItem('user');
    localStorage.removeItem('password');
  }

  restore() {
    if (localStorage.getItem('user') && localStorage.getItem('password')) {
      this.user = localStorage.getItem('user').trim();
      this.password = localStorage.getItem('password').trim();
      console.log('restored login form local storage');
    } else {
      console.log('no login in local storage');
    }
  }
  
}

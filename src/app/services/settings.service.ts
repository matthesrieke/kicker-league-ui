import { Injectable } from '@angular/core';
import { Settings } from '../model/settings';

import { settings } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings: Settings;

  constructor() {
    this.settings = settings;
  }

  public getSettings(): Settings {
    return this.settings;
  }

}

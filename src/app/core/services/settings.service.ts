import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {UserSettings} from '../models/user-settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settingsSubject = new BehaviorSubject<UserSettings>({
    preferredCurrency: 'USD',
    language: 'en'
  });
  settings$ = this.settingsSubject.asObservable();

  constructor() {
    this.loadFromLocalStorage();
  }

  updateSettings(newSettings: UserSettings): void {
    this.settingsSubject.next(newSettings);
    this.saveToLocalStorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('userSettings', JSON.stringify(this.settingsSubject.getValue()));
  }

  private loadFromLocalStorage(): void {
    const data = localStorage.getItem('userSettings');
    if (data) {
      this.settingsSubject.next(JSON.parse(data));
    }
  }
}

import {Component} from '@angular/core';
import {SettingsService} from '../../core/services/settings.service';
import {UserSettings} from '../../core/models/user-settings.model';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-settings',
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  selectedCurrency: string | undefined;
  selectedLanguage: string | undefined;
  currencies = ['USD', 'EUR', 'RUB', 'TJS'];
  languages = ['en', 'ru', 'tj'];

  constructor(private settingsService: SettingsService) {
  }

  ngOnInit(): void {
    this.settingsService.settings$.subscribe(settings => {
      this.selectedCurrency = settings.preferredCurrency;
      this.selectedLanguage = settings.language;
    });
  }

  saveSettings(): void {
    const newSettings: UserSettings = {
      preferredCurrency: this.selectedCurrency,
      language: this.selectedLanguage
    };

    this.settingsService.updateSettings(newSettings);
    alert('Настройки сохранены!');
  }

  // Метод для сброса настроек
  resetSettings(): void {
    this.selectedCurrency = 'USD';  // Сброс валюты
    this.selectedLanguage = 'en';  // Сброс языка

    const defaultSettings: UserSettings = {
      preferredCurrency: 'USD',
      language: 'en'
    };

    this.settingsService.updateSettings(defaultSettings);  // Сбрасываем настройки через сервис
    alert('Настройки сброшены!');
  }
}

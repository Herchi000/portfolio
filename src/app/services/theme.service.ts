import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkThemeClass = 'dark';

  constructor() {}

  toggleTheme(isDarkMode: boolean): void {
    if (isDarkMode) {
      document.body.classList.add(this.darkThemeClass);
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove(this.darkThemeClass);
      localStorage.setItem('theme', 'light');
    }
  }

  loadTheme(): void {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      this.applyTheme(savedTheme === 'dark');
    } else {
      // Detecting if the system has dark mode activated
      const prefersDarkScheme = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      this.applyTheme(prefersDarkScheme);
    }
  }

  private applyTheme(isDarkMode: boolean): void {
    if (isDarkMode) {
      document.body.classList.add(this.darkThemeClass);
    } else {
      document.body.classList.remove(this.darkThemeClass);
    }
  }
}

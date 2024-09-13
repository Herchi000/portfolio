import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ThemeService } from "./services/theme.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
  title = "portfolio";
  fullYear = new Date().getFullYear();
  isDarkMode = false;

  private themeService = inject(ThemeService);

  ngOnInit() {
    this.themeService.loadTheme();
    this.isDarkMode = localStorage.getItem("theme") === "dark";

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        const systemPrefersDark = event.matches;
        this.themeService.toggleTheme(systemPrefersDark);
        this.isDarkMode = systemPrefersDark;
      });
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.toggleTheme(this.isDarkMode);
  }
}

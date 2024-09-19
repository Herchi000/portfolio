import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { ProjectComponent } from './components/project/project.component';
import { Project } from './interfaces/project.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ProjectComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  fullYear = new Date().getFullYear();
  isDarkMode = false;
  projects: Project[] = [
    {
      id: 1,
      title: 'Prysoft - Punto De Venta',
      subtitle: 'Gestión de ventas para pequeños comerciantes',
      description:
        'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T.)',
      images: [
        {
          url: 'images/img-project-1.jpeg',
          description: 'Gestión de ventas',
        },
        {
          url: 'images/img-project-2.jpeg',
          description: 'Emisión de facturas',
        },
        {
          url: 'images/img-project-3.jpeg',
          description: 'Control de productos y stock',
        },
      ],
    },
  ];

  private themeService = inject(ThemeService);

  ngOnInit() {
    this.themeService.loadTheme();
    this.isDarkMode = localStorage.getItem('theme') === 'dark';

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', event => {
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

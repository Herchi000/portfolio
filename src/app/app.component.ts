import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { ProjectComponent } from './components/project/project.component';
import { Project } from './interfaces/project.interface';
import { Contact } from './interfaces/contact.interface';

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
        'Software diseñado para la gestión integral de ventas y productos en pequeños comercios, utilizado por decenas de comerciantes en diversas provincias. Ofrece una plataforma intuitiva para administrar inventarios, agregar stock, realizar ventas, emitir facturas y generar etiquetas personalizadas, entre otras múltiples funcionalidades que optimizan el control y la eficiencia del negocio.',
      images: [
        {
          url: 'images/img-project-1.webp',
          description: 'Gestión de productos',
        },
        {
          url: 'images/img-project-2.webp',
          description: 'Ventas y facturación',
        },
        {
          url: 'images/img-project-3.webp',
          description: 'Estadísticas de ventas',
        },
        {
          url: 'images/img-project-4.webp',
          description: 'Generación de etiquetas',
        },
      ],
    },
  ];
  contactItems: Contact[] = [
    {
      icon: 'fa-brands fa-whatsapp',
      text: 'Whatsapp',
      link: 'https://api.whatsapp.com/send?phone=5493482308468',
    },
    {
      icon: 'fa-brands fa-linkedin',
      text: 'Linkedin',
      link: 'https://www.linkedin.com/in/hugo-emanuel-fernandez',
    },
    {
      icon: 'fa-solid fa-envelope',
      text: 'Email',
      link: 'hugofer000@gmail.com',
    },
    {
      icon: 'fa-brands fa-github',
      text: 'GitHub',
      link: 'https://github.com/Herchi000',
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

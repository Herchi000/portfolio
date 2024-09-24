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
      isMobile: false,
    },
    {
      id: 2,
      title: 'Prysoft - RRHH Escritorio',
      subtitle: 'Gestión de Recursos Humanos',
      description:
        'Utilizado por importante empresa del sector manufacturero. Creada para el personal de RRHH, programa hecho para optimizar la gestión del personal, con el objetivo de facilitar la administración de empleados, turnos, vacaciones y mensajería interna. Permite llevar un control detallado de los empleados, sus horarios, permisos y vacaciones, así como también la comunicación interna entre los miembros de la empresa.',
      images: [
        {
          url: 'images/img-project-5.webp',
          description: 'Listado e información de empleados',
        },
        {
          url: 'images/img-project-6.webp',
          description: 'Mensajería',
        },
        {
          url: 'images/img-project-7.webp',
          description: 'Creación y gestión de turnos',
        },
        {
          url: 'images/img-project-8.webp',
          description: 'Gestión de vacaciones',
        },
      ],
      isMobile: false,
    },
    {
      id: 3,
      title: 'Prysoft - RRHH Móvil',
      subtitle: 'Aplicación móvil para empleados',
      description:
        'Aplicación móvil de Recursos Humanos diseñada para empleados, facilita la consulta de horarios, la solicitud de permisos y vacaciones, y la comunicación directa con el equipo de Recursos Humanos. Totalmente sincronizada con el sistema de gestión de la empresa, esta herramienta permite a los empleados acceder a su información laboral de forma rápida y segura, desde cualquier lugar y en cualquier momento. En conjunto con la aplicación de escritorio, se logra una gestión integral y eficiente de los recursos humanos de la empresa.',
      images: [
        {
          url: 'images/img-project-9.webp',
          description: 'Interfaz sencilla',
        },
        {
          url: 'images/img-project-10.webp',
          description: 'Mensajería',
        },
        {
          url: 'images/img-project-11.webp',
          description: 'Ver turnos',
        },
        {
          url: 'images/img-project-12.webp',
          description: 'Solicitud de vacaciones',
        },
      ],
      isMobile: true,
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

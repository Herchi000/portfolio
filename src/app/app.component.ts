import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  Renderer2,
  Signal,
  viewChild,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { ProjectComponent } from './components/project/project.component';
import { Project } from './interfaces/project.interface';
import { Contact } from './interfaces/contact.interface';
import { SkillItemComponent } from './components/skill-item/skill-item.component';
import { Skill } from './interfaces/skill.interface';
import { HeaderComponent } from './layout/header/header.component';
import { ScrollService } from './services/scroll.service';
import { Subscription } from 'rxjs';
import { PageSection } from './interfaces/scroll.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ProjectComponent,
    SkillItemComponent,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnDestroy {
  title = 'portfolio';
  fullYear = new Date().getFullYear();
  private subscription: Subscription;
  homeSection: Signal<ElementRef | undefined> = viewChild('home');
  projectsSection: Signal<ElementRef | undefined> = viewChild('projects');
  aboutMeSection: Signal<ElementRef | undefined> = viewChild('aboutMe');
  contactMeSection: Signal<ElementRef | undefined> = viewChild('contactMe');

  projectCards: Project[] = [
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
          description: 'Visualización de turnos',
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
  skillItems: Skill[] = [
    {
      id: 1,
      name: 'HTML',
      icon: '/icons/icon-html5.svg',
    },
    {
      id: 2,
      name: 'CSS',
      icon: '/icons/icon-css3.svg',
    },
    {
      id: 3,
      name: 'Tailwind',
      icon: '/icons/icon-tailwindcss.svg',
    },
    {
      id: 4,
      name: 'JavaScript',
      icon: '/icons/icon-javascript.svg',
    },
    {
      id: 5,
      name: 'TypeScript',
      icon: '/icons/icon-typescript.svg',
    },
    {
      id: 6,
      name: 'Angular',
      icon: '/icons/icon-angular.svg',
    },
    {
      id: 7,
      name: 'React',
      icon: '/icons/icon-react.svg',
    },
    {
      id: 8,
      name: 'NextJS',
      icon: '/icons/icon-nextjs.svg',
    },
    {
      id: 9,
      name: 'NodeJS',
      icon: '/icons/icon-nodejs.svg',
    },
    {
      id: 10,
      name: 'Express',
      icon: '/icons/icon-express.svg',
    },
    {
      id: 11,
      name: 'Terminal',
      icon: '/icons/icon-linux.svg',
    },
    {
      id: 12,
      name: 'Docker',
      icon: '/icons/icon-docker.svg',
    },
    {
      id: 13,
      name: 'SQL',
      icon: '/icons/icon-sql.svg',
    },
    {
      id: 14,
      name: 'MongoDB',
      icon: '/icons/icon-mongodb.svg',
    },
    {
      id: 15,
      name: 'Git',
      icon: '/icons/icon-git.svg',
    },
    {
      id: 16,
      name: 'GitHub',
      icon: '/icons/icon-github.svg',
    },
  ];

  private scrollService = inject(ScrollService);

  constructor() {
    this.subscription = this.scrollService.pageSection.subscribe(section => {
      this.scroll(section);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private scroll(el: PageSection) {
    switch (el) {
      case 'home':
        this.homeSection()?.nativeElement.scrollIntoView({
          behavior: 'smooth',
        });
        break;
      case 'projects':
        this.projectsSection()?.nativeElement.scrollIntoView({
          behavior: 'smooth',
        });
        break;
      case 'aboutMe':
        this.aboutMeSection()?.nativeElement.scrollIntoView({
          behavior: 'smooth',
        });
        break;
      case 'contactMe':
        this.contactMeSection()?.nativeElement.scrollIntoView({
          behavior: 'smooth',
        });
        break;
    }
  }
}

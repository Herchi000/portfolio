import {
  Component,
  ElementRef,
  inject,
  Renderer2,
  Signal,
  viewChild,
} from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { NavigationEnd, Router } from '@angular/router';
import { ScrollService } from '../../services/scroll.service';
import { PageSection } from '../../interfaces/scroll.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isDarkMode = false;
  mobileMenu: Signal<ElementRef | undefined> = viewChild('mobileMenu');
  burgerButton: Signal<ElementRef | undefined> = viewChild('burgerButton');
  isDisplayed = false;

  private renderer2: Renderer2 = inject(Renderer2);
  private themeService: ThemeService = inject(ThemeService);
  private router: Router = inject(Router);
  private scrollService: ScrollService = inject(ScrollService);

  ngOnInit(): void {
    this.themeService.loadTheme();
    this.isDarkMode = localStorage.getItem('theme') === 'dark';

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', event => {
        const systemPrefersDark = event.matches;
        this.themeService.toggleTheme(systemPrefersDark);
        this.isDarkMode = systemPrefersDark;
      });

    // this.router.events.subscribe(event => {
    //   if (!(event instanceof NavigationEnd)) {
    //     return;
    //   }
    //   window.scrollTo(0, 0);
    // });
  }

  toggleMobileMenu() {
    const mobileMenuHTML = this.mobileMenu()?.nativeElement;
    const burgerButtonHTML = this.burgerButton()?.nativeElement;

    if (this.isDisplayed) {
      this.renderer2.setStyle(mobileMenuHTML, 'top', '-100%');
      this.renderer2.removeClass(burgerButtonHTML, 'header-icon');
    } else {
      this.renderer2.setStyle(mobileMenuHTML, 'top', '0');
      this.renderer2.addClass(burgerButtonHTML, 'header-icon');
    }

    this.isDisplayed = !this.isDisplayed;
  }

  scroll(el: PageSection, fromMobileMenu = false) {
    this.scrollService.pageSection.next(el);
    if (fromMobileMenu) {
      this.toggleMobileMenu();
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.toggleTheme(this.isDarkMode);
  }
}

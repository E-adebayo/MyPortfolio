import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCode,
  faHome,
  faUser,
  faProjectDiagram,
  faBriefcase,
  faSun,
  faMoon
} from '@fortawesome/free-solid-svg-icons';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { JobPopupComponent } from '../job-popup/job-popup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    FontAwesomeModule,
    LanguageSwitcherComponent,
    TranslatePipe,
    JobPopupComponent  ]
})
export class HeaderComponent implements OnInit {
  @ViewChild('themeToggle', { static: false }) themeToggleRef!: ElementRef<HTMLElement>;

  faCode = faCode;
  faHome = faHome;
  faUser = faUser;
  faProjectDiagram = faProjectDiagram;
  faBriefcase = faBriefcase;
  faSun = faSun;
  faMoon = faMoon;
  isDarkMode = true;
  isToggling = false;

  ngOnInit() {
    // Set dark mode as default
    document.body.classList.add('dark-theme');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark';
      if (this.isDarkMode) {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
      }
    }
  }

  toggleTheme() {
    if (this.isToggling) return;
    
    this.isToggling = true;
    
    // Add ripple effect class
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.classList.add('clicked');
      
      // Remove ripple effect after animation
      setTimeout(() => {
        themeToggle.classList.remove('clicked');
      }, 600);
    }

    // Add transitioning class to icon for animation
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
      themeIcon.classList.add('transitioning');
      
      // Remove transitioning class after animation
      setTimeout(() => {
        themeIcon.classList.remove('transitioning');
      }, 600);
    }

    // Add body transition for smooth theme change
    document.body.style.transition = 'background-color 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), color 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

    // Toggle theme with delay for icon animation
    setTimeout(() => {
      this.isDarkMode = !this.isDarkMode;
      document.body.classList.toggle('dark-theme');
      
      // Save theme preference
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
      
      // Remove transition after theme change
      setTimeout(() => {
        document.body.style.transition = '';
        this.isToggling = false;
      }, 400);
    }, 300); // Delay to sync with icon animation
  }
}

import { Component, OnInit } from '@angular/core';
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
export class HeaderComponent implements OnInit {  faCode = faCode;
  faHome = faHome;
  faUser = faUser;
  faProjectDiagram = faProjectDiagram;
  faBriefcase = faBriefcase;
  faSun = faSun;
  faMoon = faMoon;
  isDarkMode = true;

  ngOnInit() {
    // Set dark mode as default
    document.body.classList.add('dark-theme');
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-theme');
  }
}

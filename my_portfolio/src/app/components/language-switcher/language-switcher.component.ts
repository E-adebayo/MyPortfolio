import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss']
})
export class LanguageSwitcherComponent implements OnInit {
  currentLanguage: string = 'en';

  constructor(private translationService: TranslationService) { }

  ngOnInit(): void {
    this.translationService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  switchLanguage(language: string): void {
    this.translationService.setLanguage(language);
  }

  getFlagPath(language: string): string {
    const flagMap: { [key: string]: string } = {
      'en': 'uk.svg',
      'fr': 'fr.svg'
    };
    return `${environment.baseUrl}/assets/images/languages/${flagMap[language]}`;
  }
}

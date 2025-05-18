import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly LANGUAGE_KEY = 'preferred_language';
  private currentLanguageSubject = new BehaviorSubject<string>(this.getInitialLanguage());
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  private translations: Record<string, any> = {};
  private translationsCache$: Observable<any> | null = null;

  constructor(private http: HttpClient) { }

  private getInitialLanguage(): string {
    const savedLang = localStorage.getItem(this.LANGUAGE_KEY);
    if (savedLang) {
      return savedLang;
    }

    // Default to browser language or fallback to English
    const browserLang = navigator.language.split('-')[0];
    return ['fr', 'en'].includes(browserLang) ? browserLang : 'en';
  }

  loadTranslations(): Observable<any> {
    if (!this.translationsCache$) {
      this.translationsCache$ = this.currentLanguage$.pipe(
        switchMap(lang => this.http.get<any>(`${environment.baseUrl}/assets/data/i18n/${lang}.json`)),
        map(translations => {
          this.translations = translations;
          return translations;
        }),
        shareReplay(1)
      );
    }
    return this.translationsCache$;
  }

  setLanguage(language: string): void {
    localStorage.setItem(this.LANGUAGE_KEY, language);
    this.currentLanguageSubject.next(language);
    // Reset cache when language changes
    this.translationsCache$ = null;
  }

  get(key: string): string {
    return this.getNestedTranslation(this.translations, key) || key;
  }

  private getNestedTranslation(obj: any, path: string): string {
    const keys = path.split('.');
    return keys.reduce((o, k) => (o && o[k] !== undefined) ? o[k] : undefined, obj);
  }
}

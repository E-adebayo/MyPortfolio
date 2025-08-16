import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly LANGUAGE_KEY = 'preferred_language';
  private readonly CACHE_DURATION = 3600000; // 1 hour in milliseconds
  private readonly SUPPORTED_LANGUAGES = ['en', 'fr'];

  private currentLanguageSubject = new BehaviorSubject<string>(this.getInitialLanguage());
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  private translations: Record<string, any> = {};
  private translationsCache$: Observable<any> | null = null;
  private lastCacheTime: number = 0;

  constructor(private http: HttpClient) { }

  private getInitialLanguage(): string {
    const savedLang = localStorage.getItem(this.LANGUAGE_KEY);
    if (savedLang && this.SUPPORTED_LANGUAGES.includes(savedLang)) {
      return savedLang;
    }

    // Default to browser language or fallback to English
    const browserLang = navigator.language.split('-')[0];
    return this.SUPPORTED_LANGUAGES.includes(browserLang) ? browserLang : 'en';
  }

  loadTranslations(): Observable<any> {
    const now = Date.now();
    
    // Clear cache if it's expired
    if (now - this.lastCacheTime > this.CACHE_DURATION) {
      this.translationsCache$ = null;
    }

    if (!this.translationsCache$) {
      this.lastCacheTime = now;
      this.translationsCache$ = this.currentLanguage$.pipe(
        switchMap(lang => this.http.get<any>(`${environment.baseUrl}/assets/data/i18n/${lang}.json`).pipe(
          catchError((error: HttpErrorResponse) => {
            console.error('Error loading translations:', error);
            // Fall back to english if there's an error
            if (lang !== 'en') {
              return this.http.get<any>(`${environment.baseUrl}/assets/data/i18n/en.json`);
            }
            return of({});
          })
        )),
        tap(translations => {
          this.translations = translations;
        }),
        shareReplay(1)
      );
    }
    return this.translationsCache$;
  }

  setLanguage(language: string): void {
    if (!this.SUPPORTED_LANGUAGES.includes(language)) {
      console.warn(`Unsupported language: ${language}. Falling back to English.`);
      language = 'en';
    }
    localStorage.setItem(this.LANGUAGE_KEY, language);
    this.currentLanguageSubject.next(language);
    // Reset cache when language changes
    this.translationsCache$ = null;
    this.lastCacheTime = 0;
  }

  get(key: string): string {
    const translation = this.getNestedTranslation(this.translations, key);
    if (!translation && key.includes('.')) {
      console.warn(`Missing translation for key: ${key}`);
    }
    return translation || key;
  }

  private getNestedTranslation(obj: any, path: string): string {
    return path.split('.').reduce((o, k) => (o && o[k] !== undefined) ? o[k] : undefined, obj);
  }

  getSupportedLanguages(): string[] {
    return [...this.SUPPORTED_LANGUAGES];
  }
}

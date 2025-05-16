import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { TranslationService } from './translation.service';
import { environment } from '../../environments/environment';

export interface Profile {
  name: string;
  title: string;
  description: string;
  email: string;
  location: string;
  phone: string;
  social: {
    linkedin: string;
    github: string;
  };
  skills: {
    category: string;
    items: string[];
  }[];
  interests?: string[];
}

interface LocalizedProfiles {
  en: Profile;
  fr: Profile;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(
    private http: HttpClient,
    private translationService: TranslationService
  ) { } getProfile(): Observable<Profile> {
    return this.http.get<LocalizedProfiles>(`${environment.baseUrl}/assets/data/profile.json`).pipe(
      switchMap(profiles => this.translationService.currentLanguage$.pipe(
        map(lang => {
          // Return the profile for the current language, fallback to English
          return profiles[lang as keyof LocalizedProfiles] || profiles.en;
        })
      ))
    );
  }

  getCurrentLang(): 'en' | 'fr' {
    // Get the current language from local storage or default to 'en'
    const lang = localStorage.getItem('preferred_language') || 'en';
    return lang === 'fr' ? 'fr' : 'en';
  }
}

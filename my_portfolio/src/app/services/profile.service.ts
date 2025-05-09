import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { TranslationService } from './translation.service';

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
  ) { }

  getProfile(): Observable<Profile> {
    return this.http.get<LocalizedProfiles>('/assets/data/profile.json').pipe(
      switchMap(profiles => this.translationService.currentLanguage$.pipe(
        map(lang => {
          // Return the profile for the current language, fallback to English
          return profiles[lang as keyof LocalizedProfiles] || profiles.en;
        })
      ))
    );
  }
}

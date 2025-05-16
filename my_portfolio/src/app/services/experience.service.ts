import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { TranslationService } from './translation.service';
import { environment } from '../../environments/environment';

export interface Experience {
  id: number;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
}

export interface ExperienceResponse {
  experiences: Experience[];
}

interface LocalizedExperiences {
  en: ExperienceResponse;
  fr: ExperienceResponse;
}

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  constructor(
    private http: HttpClient,
    private translationService: TranslationService
  ) { }

  getExperiences(): Observable<ExperienceResponse> {
    return this.http.get<LocalizedExperiences>(`${environment.baseUrl}/assets/data/experience.json`).pipe(
      switchMap(experienceData => this.translationService.currentLanguage$.pipe(
        map(lang => {
          // Return the experiences for the current language, fallback to English
          return experienceData[lang as keyof LocalizedExperiences] || experienceData.en;
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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { TranslationService } from './translation.service';
import { environment } from '../../environments/environment';

export interface Project {
  id: number;
  title: string;
  description: string;
  status: string;
  technologies: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
  highlights: string[];
}

export interface ProjectsResponse {
  projects: Project[];
}

interface LocalizedProjects {
  en: ProjectsResponse;
  fr: ProjectsResponse;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor(
    private http: HttpClient,
    private translationService: TranslationService
  ) { }

  getProjects(): Observable<ProjectsResponse> {
    return this.http.get<LocalizedProjects>(`${environment.baseUrl}/assets/data/projects.json`).pipe(
      switchMap(response => this.translationService.currentLanguage$.pipe(
        map(lang => {
          // Return projects for the current language, fallback to English
          return response[lang as keyof LocalizedProjects] || response.en;
        })
      ))
    );
  }

  getProjectById(id: number): Observable<Project | undefined> {
    return this.getProjects().pipe(
      map(response => response.projects.find(project => project.id === id))
    );
  }
}

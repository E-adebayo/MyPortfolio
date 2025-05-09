import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  constructor(private http: HttpClient) { }

  getExperiences(): Observable<ExperienceResponse> {
    return this.http.get<ExperienceResponse>('/assets/data/experience.json');
  }
}

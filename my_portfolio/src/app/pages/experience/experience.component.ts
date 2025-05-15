import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBriefcase,
  faCalendarAlt,
  faBuilding,
  faMapMarkerAlt,
  faCode,
  faSpinner,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ExperienceService, Experience } from '../../services/experience.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, TranslatePipe]
})
export class ExperienceComponent implements OnInit {
  experiences: Experience[] = [];
  loading = true;
  error: string | null = null;

  // Font Awesome icons
  faBriefcase = faBriefcase;
  faCalendar = faCalendarAlt;
  faBuilding = faBuilding;
  faMapMarker = faMapMarkerAlt;
  faCode = faCode;
  faSpinner = faSpinner;
  faExclamationCircle = faExclamationCircle;

  constructor(private experienceService: ExperienceService) { }

  ngOnInit() {
    this.experienceService.getExperiences().subscribe({
      next: (data) => {
        this.experiences = data.experiences;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }

  getFormattedDate(date: string): string {
    return new Date(date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
    });
  }
}

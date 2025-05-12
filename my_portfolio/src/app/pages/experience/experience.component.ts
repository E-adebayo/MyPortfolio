import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceService, Experience } from '../../services/experience.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  experiences: Experience[] = [];
  loading = true;
  error = '';

  constructor(private experienceService: ExperienceService) {}

  ngOnInit(): void {
    this.experienceService.getExperiences().subscribe({
      next: (data) => {
        this.experiences = data.experiences;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load experience data';
        this.loading = false;
        console.error('Error loading experience:', error);
      }
    });
  }
}

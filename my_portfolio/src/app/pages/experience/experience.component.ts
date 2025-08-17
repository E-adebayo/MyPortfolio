import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBriefcase,
  faCalendarAlt,
  faBuilding,
  faMapMarkerAlt,
  faCode,
  faSpinner,
  faExclamationCircle,
  faUser,
  faClock,
  faAward
} from '@fortawesome/free-solid-svg-icons';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ExperienceService, Experience } from '../../services/experience.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, TranslatePipe]
})
export class ExperienceComponent implements OnInit, OnDestroy {
  experiences: Experience[] = [];
  loading = true;
  error: string | null = null;
  private destroy$ = new Subject<void>();

  // Font Awesome icons
  faBriefcase = faBriefcase;
  faCalendar = faCalendarAlt;
  faBuilding = faBuilding;
  faMapMarker = faMapMarkerAlt;
  faCode = faCode;
  faSpinner = faSpinner;
  faExclamationCircle = faExclamationCircle;
  faUser = faUser;
  faClock = faClock;
  faAward = faAward;

  constructor(private experienceService: ExperienceService) { }

  ngOnInit() {
    this.loadExperiences();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadExperiences() {
    this.experienceService.getExperiences()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          // Sort experiences by ID in descending order (most recent first)
          this.experiences = data.experiences.sort((a, b) => b.id - a.id);
          this.loading = false;
          this.animateOnScroll();
        },
        error: (err) => {
          this.error = err.message || 'Failed to load experiences';
          this.loading = false;
        }
      });
  }

  getFormattedDate(date: string): string {
    try {
      return new Date(date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
      });
    } catch (error) {
      return date; // Return original if formatting fails
    }
  }

  // TrackBy functions for better performance
  trackByResponsibility(index: number, responsibility: string): string {
    return responsibility;
  }

  trackByTechnology(index: number, technology: string): string {
    return technology;
  }

  trackByExperience(index: number, experience: Experience): number {
    return experience.id;
  }

  // Enhanced methods for better UX
  getTotalExperience(): string {
    if (this.experiences.length === 0) return '0';
    
    const sortedExperiences = this.experiences.sort((a, b) => 
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
    
    const firstStart = new Date(sortedExperiences[0].startDate);
    const lastEnd = this.experiences.find(exp => exp.endDate === 'Present') 
      ? new Date() 
      : new Date(Math.max(...this.experiences.map(exp => 
          exp.endDate === 'Present' ? Date.now() : new Date(exp.endDate).getTime()
        )));
    
    const diffYears = lastEnd.getFullYear() - firstStart.getFullYear();
    return diffYears > 0 ? `${diffYears}+` : '1';
  }

  getExperienceDuration(experience: Experience): string {
    const start = new Date(experience.startDate);
    const end = experience.endDate === 'Present' ? new Date() : new Date(experience.endDate);
    
    const diffMonths = (end.getFullYear() - start.getFullYear()) * 12 + 
                      (end.getMonth() - start.getMonth());
    
    if (diffMonths < 12) {
      return `${diffMonths} month${diffMonths !== 1 ? 's' : ''}`;
    } else {
      const years = Math.floor(diffMonths / 12);
      const months = diffMonths % 12;
      return `${years} year${years !== 1 ? 's' : ''}${months > 0 ? ` ${months} month${months !== 1 ? 's' : ''}` : ''}`;
    }
  }

  private animateOnScroll() {
    // Enhanced animation on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe timeline items after they're rendered
    setTimeout(() => {
      const timelineItems = document.querySelectorAll('.timeline-item');
      timelineItems.forEach(item => observer.observe(item));
    }, 100);
  }

  // Helper method to get technology color (for future enhancements)
  getTechnologyColor(tech: string): string {
    const colorMap: { [key: string]: string } = {
      'Python': '#3776ab',
      'JavaScript': '#f7df1e',
      'TypeScript': '#3178c6',
      'Angular': '#dd0031',
      'React': '#61dafb',
      'Node.js': '#339933',
      'MongoDB': '#47a248',
      'SQL': '#336791',
      'Azure': '#0078d4',
      'AWS': '#ff9900',
      'Docker': '#2496ed',
      'Kubernetes': '#326ce5'
    };
    return colorMap[tech] || 'var(--accent-color)';
  }
}

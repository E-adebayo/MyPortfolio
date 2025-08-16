import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faEnvelope, 
  faPhone, 
  faLocationDot
} from '@fortawesome/free-solid-svg-icons';
import { 
  faLinkedin,
  faGithub
} from '@fortawesome/free-brands-svg-icons';
import { ProfileService, Profile } from '../../services/profile.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { SkillIconComponent } from '../../components/skill-icon/skill-icon.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe, FontAwesomeModule, SkillIconComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  profile?: Profile;
  error: string = '';
  loading: boolean = true;
  
  // FontAwesome icons
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faLocationDot = faLocationDot;
  faLinkedin = faLinkedin;
  faGithub = faGithub;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getProfile().subscribe({
      next: (data) => {
        this.profile = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load profile data';
        this.loading = false;
        console.error('Error loading profile:', error);
      }
    });
  }
  formatCategoryKey(category: string): string {
    // For French categories, map to the English keys used in translation files
    const frToEnMap: { [key: string]: string } = {
      'langages de programmation': 'programminglanguages',
      'frameworks et bibliothèques web': 'webframeworksandlibraries',
      'cloud et infrastructure': 'cloudandinfrastructure',
      'devops et orchestration': 'devopsandorchestration',
      'bases de données': 'databases',
      'business intelligence et visualisation': 'businessintelligenceandvisualization',
      'méthodologies de gestion': 'projectmanagementmethodologies',
      'contrôle de version et collaboration': 'versioncontrolandcollaboration',
      'automatisation et scripting': 'automationandscripting',
      'systèmes d\'exploitation': 'operatingsystems',
      'serveurs web': 'webservers',
      'réseaux et virtualisation': 'networkingandvirtualization',
      'intelligence artificielle et llm': 'artificialintelligenceandllm',
      'tests et outils spécialisés': 'testingandspecializedtools'
    };

    // Convert category to lowercase for mapping
    const lowerCategory = category.toLowerCase();

    // If it's a French category that needs mapping, return the mapped English key
    if (frToEnMap[lowerCategory]) {
      return frToEnMap[lowerCategory];
    }

    // Otherwise use the default formatting (for English categories)
    return lowerCategory.replace(/\s+/g, '').replace(/&/g, 'and');
  }
}

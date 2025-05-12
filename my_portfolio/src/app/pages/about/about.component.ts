import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService, Profile } from '../../services/profile.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  profile?: Profile;
  loading = true;
  error = '';
  // Education data
  education = [
    {
      degree: {
        en: "Engineer in Computer Science",
        fr: "Ingénieur en Informatique"
      },
      institution: {
        en: 'University of Technology of Belfort-Montbéliard',
        fr: 'Université de Technologie de Belfort-Montbéliard'
      },
      location: {
        en: 'Belfort, France',
        fr: 'Belfort, France'
      },
      period: {
        en: '2022 - 2025',
        fr: '2022 - 2025'
      },
      description: {
        en: 'Specialized in Web Technologies, Data Science, Cloud Computing and project management.',
        fr: 'Spécialisé en Technologies Web, Data Science, Cloud Computing et gestion de projets.'
      }
    },
    {
      degree: {
        en: "Bachelor's in Computer Science",
        fr: "Licence en Informatique"
      },
      institution: {
        en: 'Institut Africain d\'Informatique',
        fr: 'Institut Africain d\'Informatique'
      },
      location: {
        en: 'Lomé, Togo',
        fr: 'Lomé, Togo'
      },
      period: {
        en: '2018 - 2021',
        fr: '2018 - 2021'
      },
      description: {
        en: 'Focused on programming fundamentals and software engineering; system and network administration.',
        fr: 'Axé sur les fondamentaux de la programmation et du génie logiciel; administration des systèmes et réseaux.'
      }
    }
  ];
  // Certifications data
  certifications = [
    {
      name: {
        en: 'Google - Associate Cloud Engineer ',
        fr: 'Google - Associate Cloud Engineer '
      },
      issuer: {
        en: 'Google',
        fr: 'Google'
      },
      date: {
        en: 'June 2024',
        fr: 'Juin 2024'
      },
      link: 'https://www.cloudskillsboost.google/public_profiles/c5e0dde0-0646-4e1b-af22-a06e5a1dc423/'     
    },
    {
      name: {
        en: 'Learn Amazon Web Services (AWS) ',
        fr: 'Apprendre Amazon Web Services (AWS)'
      },
      issuer: {
        en: 'Udemy',
        fr: 'Udemy'
      },
      date: {
        en: 'March 2025',
        fr: 'Mars 2025'
      },
      link: 'https://example.com/certification/aws'
    },
    {
      name: {
        en: 'CCNA - Introduction to Networks',
        fr: 'CCNA - Introduction aux Réseaux'
      },
      issuer: {
        en: 'Cisco',
        fr: 'Cisco'
      },
      date: {
        en: 'November 2022',
        fr: 'Novembre 2022'
      },
      link: 'https://example.com/certification/angular'
    },
    {
      name: {
        en: 'Azure AI : Artificial Intelligence and Machine Learning',
        fr: 'Azure AI : Intelligence artificielle et machine learning'
      },
      issuer: {
        en: 'LinkedIn Learning',
        fr: 'LinkedIn Learning'
      },
      date: {
        en: 'October 2023',
        fr: 'Octobre 2023'
      },
      link: 'https://example.com/certification/aws'
    },
    {
      name: {
        en: 'Accelerating End-to-End Data Science Workflows',
        fr: 'Accélérer les workflows de science des données de bout en bout'
      },
      issuer: {
        en: 'NVIDIA',
        fr: 'NVIDIA'
      },
      date: {
        en: 'June 2023',
        fr: 'Juin 2023'
      },
      link: 'https://example.com/certification/nvidia'
    },
    {
      name: {
        en: 'MongoDB Python Developer',
        fr: 'Développeur Python MongoDB'
      },
      issuer: {
        en: 'MongoDB',
        fr: 'MongoDB'
      },
      date: {
        en: 'June 2023',
        fr: 'Juin 2023'
      },
      link: 'https://example.com/certification/mongodb'
    }
  ];
  // Interests data
  interests = [
    {
      en: 'Audit IT',
      fr: 'Audit IT'
    },
    {
      en: 'Web Application Development',
      fr: 'Développement d\'Applications Web'
    },
    {
      en: 'Artificial Intelligence',
      fr: 'Intelligence Artificielle'
    },
    {
      en: 'Cloud Computing',
      fr: 'Cloud Computing'
    },
    {
      en: 'Project Management',
      fr: 'Gestion de Projet'
    }
  ];
  constructor(public profileService: ProfileService) {}
  ngOnInit(): void {
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
  }    formatCategoryKey(category: string): string {
    // For French categories, map to the English keys used in translation files
    const frToEnMap: {[key: string]: string} = {
      'langages et frameworks': 'languagesandframeworks',
      'bases de données et datawarehouse': 'databasesanddatawarehouse',
      'cloud et devops': 'cloudanddevops',
      'visualisation de données et etl': 'datavisualizationandetl',
      'méthodologies et outils': 'methodologiesandtools',
      'collaboration et contrôle de version': 'collaborationandversioncontrol',
      'automatisation et scripting': 'automationandscripting',
      'serveur web': 'webserver',
      'systèmes et réseaux': 'systemsandnetworks'
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

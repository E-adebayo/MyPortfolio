import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faEnvelope,
  faLocationDot,
  faPhone,
  faUser,
  faCode,
  faSpinner,
  faExclamationCircle,
  faHeart,
  faGraduationCap,
  faCertificate,
  faLanguage,
  faBuilding,
  faArrowUpRightFromSquare
} from '@fortawesome/free-solid-svg-icons';
import {
  faLinkedinIn,
  faGithub
} from '@fortawesome/free-brands-svg-icons';
import { ProfileService, Profile } from '../../services/profile.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, TranslatePipe],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  profile?: Profile;
  loading = true;
  error = '';
  // Font Awesome icons
  faEnvelope = faEnvelope;
  faMapMarker = faLocationDot;
  faPhone = faPhone;
  faLinkedin = faLinkedinIn;
  faGithub = faGithub;
  faUser = faUser;
  faCode = faCode;
  faSpinner = faSpinner;
  faExclamationCircle = faExclamationCircle;
  faHeart = faHeart;
  faGraduationCap = faGraduationCap;
  faCertificate = faCertificate;
  faLanguage = faLanguage;
  faBuilding = faBuilding;
  faExternalLink = faArrowUpRightFromSquare;

  // Education data
  education = [
    {
      degree: {
        en: "IT Engineer (Bac+5)",
        fr: "Ingénieur en Informatique (Bac+5)"
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
        en: "Bachelor in Computer Science (Bac+3)",
        fr: "Licence en Informatique (Bac+3)"
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
      link: 'https://www.udemy.com/course/learn-amazon-web-services-aws-easily-to-become-architect/'
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
      link: 'https://www.credly.com/badges/e3cd4c95-c8b3-4582-b613-ceaf00a33b27/'
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
      link: 'https://www.linkedin.com/learning/certificates/19023a93ae446138b1bd37eb601eabcbea7ed852a0988c51472a1a458a5e5fa4?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BEL2OlmRZRdyoZfQBf8XY4g%3D%3D'
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
      link: 'https://learn.nvidia.com/certificates?id=15e11f2711cc4c07a7f38934729d93fc'
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
      link: 'https://learn.mongodb.com/c/tLq7zJ-gR12_LrTD2v6LRA'
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

  // Languages data
  languages = [
    {
      name: {
        en: 'English',
        fr: 'Anglais'
      },
      level: {
        en: 'C1 - Advanced (Proficient user)',
        fr: 'C1 - Avancé (Utilisateur autonome)'
      }
    },
    {
      name: {
        en: 'French',
        fr: 'Français'
      },
      level: {
        en: 'Native (Fluent)',
        fr: 'Courant (Langue maternelle)'
      }
    }
  ];

  constructor(public profileService: ProfileService) { }
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
  } formatCategoryKey(category: string): string {
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
  getLevelPercentage(level: string): string {
    const levels: { [key: string]: number } = {
      'Native': 100,
      'Fluent': 95,
      'Advanced': 85,
      'Intermediate': 65,
      'Basic': 40,
      'Natif': 100,
      'Courant': 95,
      'Avancé': 85,
      'Intermédiaire': 65,
      'Débutant': 40,
      'C1': 85  // Adding CEFR levels
    };

    // Extract the level from the string by looking for known keywords
    const matchingLevel = Object.keys(levels).find(key => level.includes(key));
    return `${matchingLevel ? levels[matchingLevel] : 0}%`;
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService, Profile } from '../../services/profile.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
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
      degree: "Master's in Computer Science",
      institution: 'University of Technology',
      location: 'Belfort, France',
      period: '2020 - 2022',
      description: 'Specialized in Web Technologies and Mobile Development.'
    },
    {
      degree: "Bachelor's in Computer Science",
      institution: 'National University',
      location: 'Lyon, France',
      period: '2017 - 2020',
      description: 'Focused on programming fundamentals and software engineering.'
    }
  ];

  // Certifications data
  certifications = [
    {
      name: 'Angular Certified Developer',
      issuer: 'Google',
      date: 'May 2023',
      link: 'https://example.com/certification/angular'
    },
    {
      name: 'AWS Certified Developer - Associate',
      issuer: 'Amazon Web Services',
      date: 'January 2024',
      link: 'https://example.com/certification/aws'
    },
    {
      name: 'MongoDB Certified Developer',
      issuer: 'MongoDB Inc.',
      date: 'October 2023',
      link: 'https://example.com/certification/mongodb'
    }
  ];

  // Interests data
  interests = [
    'Open Source Contribution',
    'Web Application Development',
    'UI/UX Design',
    'Cloud Computing',
    'Machine Learning'
  ];

  constructor(private profileService: ProfileService) {}

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
  }
}

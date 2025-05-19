import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-skill-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skill-icon.component.html',
  styleUrl: './skill-icon.component.scss'
})
export class SkillIconComponent {
  @Input() skill!: { name: string; icon: string };
  
  constructor(private sanitizer: DomSanitizer) {}

  getIconPath(): string {
    return `${environment.baseUrl}/assets/images/skills/${this.skill.icon}`;
  }
}

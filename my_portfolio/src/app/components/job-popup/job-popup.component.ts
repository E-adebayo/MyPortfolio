import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-job-popup',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, TranslatePipe],
  templateUrl: './job-popup.component.html',
  styleUrls: ['./job-popup.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(-20px)'
      })),
      transition(':enter', [
        animate('0.5s ease-out', style({
          opacity: 1, 
          transform: 'translateY(0)'
        }))
      ]),
      transition(':leave', [
        animate('0.3s ease-in', style({
          opacity: 0,
          transform: 'translateY(-20px)'
        }))
      ])
    ])
  ]
})

export class JobPopupComponent implements OnInit {
  faTimes = faTimes;
  faBriefcase = faBriefcase;
  isHidden = false;
  private autoHideTimeout: any;

  constructor() {}

  ngOnInit(): void {
    // Set timer to auto-hide after 1 minute
    this.autoHideTimeout = setTimeout(() => {
      this.isHidden = true;
    }, 60000); // 1 minute in milliseconds
  }
  dismissPopup(): void {
    this.isHidden = true;
    if (this.autoHideTimeout) {
      clearTimeout(this.autoHideTimeout);
    }
  }

  ngOnDestroy(): void {
    if (this.autoHideTimeout) {
      clearTimeout(this.autoHideTimeout);
    }
  }
}

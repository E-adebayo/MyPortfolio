import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AboutComponent } from './about.component';
import { ProfileService } from '../../services/profile.service';
import { of } from 'rxjs';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let profileServiceSpy: jasmine.SpyObj<ProfileService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProfileService', ['getProfile']);
    spy.getProfile.and.returnValue(of({
      name: 'Test User',
      title: 'Software Engineer',
      description: 'Test description',
      email: 'test@example.com',
      location: 'Test Location',
      phone: '+1234567890',
      social: {
        linkedin: 'https://linkedin.com',
        github: 'https://github.com'
      },
      skills: []
    }));

    await TestBed.configureTestingModule({
      imports: [AboutComponent, HttpClientTestingModule],
      providers: [
        { provide: ProfileService, useValue: spy }
      ]
    })
      .compileComponents();

    profileServiceSpy = TestBed.inject(ProfileService) as jasmine.SpyObj<ProfileService>;
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load profile data on init', () => {
    expect(profileServiceSpy.getProfile).toHaveBeenCalled();
    expect(component.profile).toBeDefined();
    expect(component.loading).toBeFalse();
  });

  it('should have education data', () => {
    expect(component.education.length).toBeGreaterThan(0);
  });

  it('should have certifications data', () => {
    expect(component.certifications.length).toBeGreaterThan(0);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPopupComponent } from './job-popup.component';

describe('JobPopupComponent', () => {
  let component: JobPopupComponent;
  let fixture: ComponentFixture<JobPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

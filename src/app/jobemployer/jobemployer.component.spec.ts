import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobemployerComponent } from './jobemployer.component';

describe('JobemployerComponent', () => {
  let component: JobemployerComponent;
  let fixture: ComponentFixture<JobemployerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobemployerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobemployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

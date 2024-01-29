import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovoituragePageComponent } from './covoiturage-page.component';

describe('CovoituragePageComponent', () => {
  let component: CovoituragePageComponent;
  let fixture: ComponentFixture<CovoituragePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CovoituragePageComponent]
    });
    fixture = TestBed.createComponent(CovoituragePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

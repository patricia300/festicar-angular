import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovoiturageCardComponent } from './covoiturage-card.component';

describe('CovoiturageCardComponent', () => {
  let component: CovoiturageCardComponent;
  let fixture: ComponentFixture<CovoiturageCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CovoiturageCardComponent]
    });
    fixture = TestBed.createComponent(CovoiturageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

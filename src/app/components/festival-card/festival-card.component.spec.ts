import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FestivalCardComponent } from './festival-card.component';

describe('FestivalCardComponent', () => {
  let component: FestivalCardComponent;
  let fixture: ComponentFixture<FestivalCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FestivalCardComponent]
    });
    fixture = TestBed.createComponent(FestivalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

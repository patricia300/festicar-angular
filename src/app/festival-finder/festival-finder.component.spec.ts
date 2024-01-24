import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FestivalFinderComponent } from './festival-finder.component';

describe('FestivalFinderComponent', () => {
  let component: FestivalFinderComponent;
  let fixture: ComponentFixture<FestivalFinderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FestivalFinderComponent]
    });
    fixture = TestBed.createComponent(FestivalFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

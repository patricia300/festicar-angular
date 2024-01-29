import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommuneInputComponent } from './commune-input.component';

describe('CommuneInputComponent', () => {
  let component: CommuneInputComponent;
  let fixture: ComponentFixture<CommuneInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommuneInputComponent]
    });
    fixture = TestBed.createComponent(CommuneInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

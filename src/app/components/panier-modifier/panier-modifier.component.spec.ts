import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierModifierComponent } from './panier-modifier.component';

describe('PanierModifierComponent', () => {
  let component: PanierModifierComponent;
  let fixture: ComponentFixture<PanierModifierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanierModifierComponent]
    });
    fixture = TestBed.createComponent(PanierModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

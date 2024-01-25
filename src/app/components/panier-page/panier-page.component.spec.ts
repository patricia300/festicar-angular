import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierPageComponent } from './panier-page.component';

describe('PanierPageComponent', () => {
  let component: PanierPageComponent;
  let fixture: ComponentFixture<PanierPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanierPageComponent]
    });
    fixture = TestBed.createComponent(PanierPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

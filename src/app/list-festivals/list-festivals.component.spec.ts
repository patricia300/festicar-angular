import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFestivalsComponent } from './list-festivals.component';

describe('ListFestivalsComponent', () => {
  let component: ListFestivalsComponent;
  let fixture: ComponentFixture<ListFestivalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListFestivalsComponent]
    });
    fixture = TestBed.createComponent(ListFestivalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

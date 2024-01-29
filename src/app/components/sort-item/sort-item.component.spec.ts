import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortItemComponent } from './sort-item.component';

describe('SortItemComponent', () => {
  let component: SortItemComponent;
  let fixture: ComponentFixture<SortItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SortItemComponent]
    });
    fixture = TestBed.createComponent(SortItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

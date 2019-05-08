import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPriceFormComponent } from './filter-price-form.component';

describe('FilterPriceFormComponent', () => {
  let component: FilterPriceFormComponent;
  let fixture: ComponentFixture<FilterPriceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterPriceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPriceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

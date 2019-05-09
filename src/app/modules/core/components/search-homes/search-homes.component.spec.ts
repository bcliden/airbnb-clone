import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHomesComponent } from './search-homes.component';

describe('SearchHomesComponent', () => {
  let component: SearchHomesComponent;
  let fixture: ComponentFixture<SearchHomesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchHomesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

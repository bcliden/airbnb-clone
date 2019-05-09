import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHomesListItemComponent } from './search-homes-list-item.component';

describe('SearchHomesListItemComponent', () => {
  let component: SearchHomesListItemComponent;
  let fixture: ComponentFixture<SearchHomesListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchHomesListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHomesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

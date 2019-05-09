import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortHomesFormComponent } from './sort-homes-form.component';

describe('SortHomesFormComponent', () => {
  let component: SortHomesFormComponent;
  let fixture: ComponentFixture<SortHomesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortHomesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortHomesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

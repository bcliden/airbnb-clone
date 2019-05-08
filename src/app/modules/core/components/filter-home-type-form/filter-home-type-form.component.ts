import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HomeTypes } from 'src/app/modules/homes/home.interface';

@Component({
  selector: 'app-filter-home-type-form',
  templateUrl: './filter-home-type-form.component.html',
  styleUrls: ['./filter-home-type-form.component.less']
})
export class FilterHomeTypeFormComponent implements OnInit {

  form: FormGroup;
  @Output() applyHomeTypeFilter = new EventEmitter<string[]>();
  @Input() defaultFilters: HomeTypes[];

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      'Entire Apartment': [this.defaultFilters.includes('Entire Apartment')],
      'Private Room': [this.defaultFilters.includes('Private Room')],
      'Tree House': [this.defaultFilters.includes('Tree House')],
      'Hotel Room': [this.defaultFilters.includes('Hotel Room')]
    })
  }

  submit(formValue) {
    const homeTypes = Object.keys(formValue).filter(filter => formValue[filter]);
    this.applyHomeTypeFilter.next(homeTypes);
  }

}

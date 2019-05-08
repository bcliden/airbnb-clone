import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-filter-home-type-form',
  templateUrl: './filter-home-type-form.component.html',
  styleUrls: ['./filter-home-type-form.component.less']
})
export class FilterHomeTypeFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      'Entire Apartment': [],
      'Private Room': [],
      'Tree House': [],
      'Hotel Room': []
    })
  }

  submit(formValue) {
    const homeTypes = Object.keys(formValue).filter(filter => formValue[filter]);
    console.log(homeTypes);
  }

}

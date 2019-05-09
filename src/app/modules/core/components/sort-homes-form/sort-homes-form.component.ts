import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SortTypes } from 'src/app/modules/homes/home.interface';

@Component({
  selector: 'app-sort-homes-form',
  templateUrl: './sort-homes-form.component.html',
  styleUrls: ['./sort-homes-form.component.less']
})
export class SortHomesFormComponent implements OnInit {

  form: FormGroup;
  @Input() defaultSort: SortTypes;
  @Output() applySort = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      sort: [this.defaultSort]
    });
  }

  submit(formValue) {
    // console.log("form submitted: ", formValue);
    this.applySort.next(formValue);
  }



}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PriceFilter } from 'src/app/modules/homes/home.interface';

@Component({
  selector: 'app-filter-price-form',
  templateUrl: './filter-price-form.component.html',
  styleUrls: ['./filter-price-form.component.less']
})
export class FilterPriceFormComponent implements OnInit {

  form: FormGroup;
  @Input() defaultFilters: PriceFilter;
  @Output() applyPriceFilter = new EventEmitter<PriceFilter>();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      min: [this.defaultFilters.min],
      max: [this.defaultFilters.max]
    });
  }

  submit(formValue) {
    const price: PriceFilter = {
      min: formValue.min,
      max: formValue.max
    };
    this.applyPriceFilter.next(price);
  }

}

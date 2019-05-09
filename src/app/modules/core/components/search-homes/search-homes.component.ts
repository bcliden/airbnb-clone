import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataState, DataService } from '../../services/data.service';
import { Home } from 'src/app/modules/homes/home.interface';

@Component({
  selector: 'app-search-homes',
  templateUrl: './search-homes.component.html',
  styleUrls: ['./search-homes.component.less']
})
export class SearchHomesComponent implements OnInit {

  @Input() results: DataState<Home[]>;
  @Output() search = new EventEmitter<string>();

  form: FormGroup
  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      search: []
    });
  }

  submit(formValue) {
    this.search.next(formValue);
  }

}

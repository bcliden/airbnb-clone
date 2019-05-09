import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataState, DataService } from '../../services/data.service';
import { Home } from 'src/app/modules/homes/home.interface';
import { fromEvent, of } from 'rxjs';
import { tap, debounceTime, switchMap, map, distinctUntilChanged } from 'rxjs/operators';

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
    private data: DataService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      search: []
    });

    fromEvent(document.getElementById('search-box'), 'keydown')
      .pipe(
        debounceTime(250),
        map((el: any) => el.target.value),
        distinctUntilChanged(),
        switchMap(query => {
          this.data.searchHomes(query);
          return of();
        })
      ).subscribe();
  }

  submit(formValue) {
    this.search.next(formValue);
  }

}

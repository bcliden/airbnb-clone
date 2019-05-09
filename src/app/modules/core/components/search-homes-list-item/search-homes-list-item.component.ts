import { Component, OnInit, Input } from '@angular/core';
import { Home } from 'src/app/modules/homes/home.interface';

@Component({
  selector: 'app-search-homes-list-item',
  templateUrl: './search-homes-list-item.component.html',
  styleUrls: ['./search-homes-list-item.component.less']
})
export class SearchHomesListItemComponent implements OnInit {

  @Input() home: Home;

  constructor() { }

  ngOnInit() {
  }

}

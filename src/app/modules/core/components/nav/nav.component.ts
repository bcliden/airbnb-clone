import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Home } from 'src/app/modules/homes/home.interface';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class NavComponent implements OnInit {

  @Input() searchResults$: Observable<Home[]>;
  @Output() search = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {  }

}

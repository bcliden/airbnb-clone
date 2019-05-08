import { Component, OnInit, Input } from '@angular/core';
import { DataState } from 'src/app/modules/core/services/data.service';
import { Home } from '../../home.interface';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.less']
})
export class HomeListComponent implements OnInit {
  @Input() homes: DataState<Home[]>;
  
  constructor() { }

  ngOnInit() {
  }

}

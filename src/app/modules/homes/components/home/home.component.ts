import { Component, OnInit, Input } from '@angular/core';
import { Home } from '../../home.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  @Input() home: Home;

  constructor() { }

  ngOnInit() {
  }

}

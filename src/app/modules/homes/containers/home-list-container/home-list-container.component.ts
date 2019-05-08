import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/modules/core/services/data.service';

@Component({
  selector: 'app-home-list-container',
  templateUrl: './home-list-container.component.html',
  styleUrls: ['./home-list-container.component.less']
})
export class HomeListContainerComponent implements OnInit {
  homes$ = this.data.getHomes$();

  constructor(
    private data: DataService
  ) { }

  ngOnInit() {
    this.data.loadHomes();
  }

}

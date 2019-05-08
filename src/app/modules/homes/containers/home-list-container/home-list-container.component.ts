import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/modules/core/services/data.service';
import { Filters } from 'src/app/modules/core/containers/header-container/header-container.component';

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
    this.data.getFiltersFromUrlQueryParams()
      .subscribe((filters: Filters) => {
        this.data.loadHomes(filters);
      });
  }

}

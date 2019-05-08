import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HomeTypes } from 'src/app/modules/homes/home.interface';

export interface FilterBarState {
  homeType: { open: boolean }
}

@Component({
  selector: 'app-header-container',
  templateUrl: './header-container.component.html',
  styleUrls: ['./header-container.component.less']
})
export class HeaderContainerComponent implements OnInit {

  filterBarState$ = new BehaviorSubject<FilterBarState>({ homeType: { open: false }});

  constructor() { }

  ngOnInit() {
  }

  toggleFilterDropdown(filter: string){
    const filters = this.filterBarState$.getValue();
    filters[filter].open = !filters[filter].open;
    this.filterBarState$.next(filters);
  }

  closeFilterDropdown(filter: string) {
    const filters = this.filterBarState$.getValue();
    filters[filter].open = false;
    this.filterBarState$.next(filters);
  }

}

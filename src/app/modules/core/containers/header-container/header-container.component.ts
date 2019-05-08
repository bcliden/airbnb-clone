import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HomeTypes } from 'src/app/modules/homes/home.interface';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

export interface FilterBarState {
  homeType: { 
    open: boolean; 
    filters: HomeTypes[];
  }
}

export interface Filters {
  homeType: HomeTypes[];
}

@Component({
  selector: 'app-header-container',
  templateUrl: './header-container.component.html',
  styleUrls: ['./header-container.component.less']
})
export class HeaderContainerComponent implements OnInit {

  filterBarState$ = new BehaviorSubject<FilterBarState>({ homeType: { open: false, filters: [] }});

  constructor(
    private router: Router,
    private data: DataService
  ) { }

  ngOnInit() {
    this.data.getFiltersFromUrlQueryParams().subscribe((filters: Filters) => {
      const filterBarState = this.filterBarState$.getValue();
      filterBarState.homeType.filters = filters.homeType;
      this.filterBarState$.next(filterBarState);
    })
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

  applyFilters(filters: Filters) {
    this.closeFilterDropdown('homeType');
    this.router.navigate(['homes'], { queryParams: { 'home-type': filters.homeType}})
  }

}

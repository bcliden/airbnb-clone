import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HomeTypes, PriceFilter } from 'src/app/modules/homes/home.interface';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { filter, tap, map } from 'rxjs/operators';

export interface FilterBarState {
  homeType: { 
    open: boolean; 
    filters: HomeTypes[];
  },
  price: {
    open: boolean;
    min?: number;
    max?: number;
  }
}

export interface Filters {
  homeType?: HomeTypes[];
  price?: PriceFilter
}

@Component({
  selector: 'app-header-container',
  templateUrl: './header-container.component.html',
  styleUrls: ['./header-container.component.less']
})
export class HeaderContainerComponent implements OnInit {

  presentFilters: Filters;
  filterBarState$ = new BehaviorSubject<FilterBarState>(
    { 
      homeType: 
        { 
          open: false, 
          filters: []
        },
      price: 
        {
          open: false,
        }  
    }
  );

  constructor(
    private router: Router,
    private data: DataService
  ) { }

  ngOnInit() {
    // send params in url to the filterBarState
    this.data.getFiltersFromUrlQueryParams().subscribe((filters: Filters) => {
      const filterBarState = this.filterBarState$.getValue();
      filterBarState.homeType.filters = filters.homeType;
      filterBarState.price.min = filters.price.min;
      filterBarState.price.max = filters.price.max;
      this.filterBarState$.next(filterBarState);
    });
    
    // 
    this.data.getFiltersFromUrlQueryParams()
      .pipe(
        map((el: Filters) => {
          // remove any empty filters so the url params don't get overwritten
          let obj: Filters = {};
          if (el.homeType.length > 0) {
            obj.homeType = el.homeType
          } 
          if(Object.keys(el.price).length > 0) {
            obj.price = el.price;
          }
          return obj;
        }),
      ).subscribe((filters: Filters) => {
        // store the new filters on this object
        this.presentFilters = filters;
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
    // go through any keys of the filters obj and close their dropdown
    Object.keys(filters).forEach(filterType => this.closeFilterDropdown(filterType));
    
    // build params obj based on present + new filters
    // unfortunately can't use spread op-- nested price makes it difficult
    let queryParams = { };

    // equivalent of [...this.presentFilters]
    if (this.presentFilters.homeType) {
      queryParams['home_type'] = this.presentFilters.homeType;
    }

    if (this.presentFilters.price && this.presentFilters.price.min) {
      queryParams['price_min'] = this.presentFilters.price.min;
    } 

    if (this.presentFilters.price && this.presentFilters.price.max) {
      queryParams['price_max'] = this.presentFilters.price.max;
    }

    // equivalent of [...this.filters], overwriting the present filters
    if (filters.homeType) {
      queryParams['home_type'] = filters.homeType;
    }

    if (filters.price  && filters.price.min >= 0) {
      queryParams['price_min'] = filters.price.min;
    } 

    if (filters.price && filters.price.max >= 0) {
      queryParams['price_max'] = filters.price.max;
    }

    // then, navigate using the new queryParams obj
    this.router.navigate(['homes'], { 
      queryParams,
      queryParamsHandling: 'merge'
    });
  }

}

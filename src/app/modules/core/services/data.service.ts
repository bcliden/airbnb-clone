import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Home } from '../../homes/home.interface';
import { delay, switchMap } from 'rxjs/operators';
import { Filters } from '../containers/header-container/header-container.component';
import { ActivatedRoute } from '@angular/router';

export interface DataState<T> {
  loading: boolean;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private homes$ = new BehaviorSubject({ loading: true, data: []});

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  getHomes$(): Observable<DataState<Home[]>> {
    return this.homes$.asObservable();
  }

  loadHomes(filters: Filters) {
    this.homes$.next({ loading: true, data: []});
    this.http.get<any[]>('assets/mocks/homes.json').pipe(
      switchMap((homes: Home[]) => {
        let obj: Home[] = homes;

        if (filters.homeType.length) {
          obj = [...obj.filter(listing => filters.homeType.includes(listing.type))];
        }
        if (filters.price && filters.price.min >= 0 ) {
          obj = [...obj.filter(listing => listing.price > filters.price.min)];
        }
        if (filters.price && filters.price.max >= 0) {
          obj = [...obj.filter(listing => listing.price < filters.price.max)];
        }

        return of(obj);
      }),
      delay(1000)
    ).subscribe((homes: Home[]) => {
      this.homes$.next({ loading: false, data: homes });
    })
  }

  getFiltersFromUrlQueryParams(): Observable<Filters> {
    // building the filters from the url params:
    return this.route.queryParams.pipe(
      switchMap(params => {
        let filters: Filters = {
          homeType: [],
          price: {}
        };

        // array can either be a string[] or a string
        if (Array.isArray(params['home_type'])) {
          filters.homeType = params['home_type'];
        };
        if (typeof params['home_type'] === 'string') {
          filters.homeType = [params['home_type']]
        };
        // store price as a number!
        if (params['price_min']) {
          filters.price.min = +params['price_min'];
        }
        if (params['price_max']) {
          filters.price.max = +params['price_max'];
        }
        return of(filters);
      })
    )
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Home, SortTypes } from '../../homes/home.interface';
import { delay, switchMap, toArray, map } from 'rxjs/operators';
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
        if (filters.sort) {
          obj = [...obj.sort(this.sortSwitch(filters.sort))] // do the hard part of writing a switch for the types
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
          price: {},
          sort: ''
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
        if (params['sort']) {
          filters.sort = params['sort'];
        }

        return of(filters);
      })
    )
  }

  private sortSwitch (string: SortTypes) {
    // this fn returns a sort function corresponding to the string
    switch(string) {
      case "rating_high":
        return (a: Home, b: Home) => b.rating.stars - a.rating.stars;
      case "rating_low":
        return (a: Home, b: Home) => a.rating.stars - b.rating.stars;
      case "most_ratings":
        return (a: Home, b: Home) => b.rating.count - a.rating.count;
      case "least_ratings":
        return (a: Home, b: Home) => a.rating.count - b.rating.count;
      case "price_high":
        return (a: Home, b: Home) => b.price - a.price;
      case "price_low":
        return (a: Home, b: Home) => a.price - b.price;
      default:
        return (a: Home, b: Home) => 0;
    }
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Home } from '../../homes/home.interface';
import { delay, switchMap, tap } from 'rxjs/operators';
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

        if (filters.homeType.length) {
          return of(homes.filter(listing => filters.homeType.includes(listing.type)));
        } 

        return of(homes);
      }),
      delay(1000)
    ).subscribe((homes: Home[]) => {
      this.homes$.next({ loading: false, data: homes });
    })
  }

  getFiltersFromUrlQueryParams(): Observable<Filters> {
    return this.route.queryParams.pipe(
      switchMap(params => {
        let filters: Filters = {
          homeType: [],
          price: {}
        };
        if (Array.isArray(params['home_type'])) {
          // return of({
          //   homeType: params['homeType'],
          //   price: { min:null, max: null }
          // });
          filters.homeType = params['home_type'];
        };
        if (typeof params['home_type'] === 'string') {
          // return of({
          //   homeType: [params['homeType']],
          //   price: { min:null, max: null }
          // })
          filters.homeType = [params['home_type']]
        };
        if (params['price_min']) {
          filters.price.min = params['price_min'];
        }
        if (params['price_max']) {
          filters.price.max = params['price_max'];
        }
        return of(filters);
      })
    )
  }
}

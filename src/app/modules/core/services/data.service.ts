import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Home } from '../../homes/home.interface';
import { delay } from 'rxjs/operators';

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
    private http: HttpClient
  ) { }

  getHomes$(): Observable<DataState<Home[]>> {
    return this.homes$.asObservable();
  }

  loadHomes() {
    this.homes$.next({ loading: true, data: []});
    this.http.get<any[]>('assets/mocks/homes.json').pipe(
      delay(1000)
    ).subscribe((homes: Home[]) => {
      this.homes$.next({ loading: false, data: homes });
    })
  }
}

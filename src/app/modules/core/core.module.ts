import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderContainerComponent } from './containers/header-container/header-container.component';
import { NavComponent } from './components/nav/nav.component';
import { FiltersComponent } from './components/filters/filters.component';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { ClickOutsideModule } from 'ng-click-outside';
import { FilterHomeTypeFormComponent } from './components/filter-home-type-form/filter-home-type-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FilterPriceFormComponent } from './components/filter-price-form/filter-price-form.component';
import { SortHomesFormComponent } from './components/sort-homes-form/sort-homes-form.component';
import { SearchHomesComponent } from './components/search-homes/search-homes.component';
import { SearchHomesListItemComponent } from './components/search-homes-list-item/search-homes-list-item.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HeaderContainerComponent, 
    NavComponent, 
    FiltersComponent, 
    FilterHomeTypeFormComponent, 
    FilterPriceFormComponent, 
    SortHomesFormComponent, 
    SearchHomesComponent, 
    SearchHomesListItemComponent, 
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ClickOutsideModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    HeaderContainerComponent, 
  ],
  providers: [DataService]
})
export class CoreModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeListContainerComponent } from './containers/home-list-container/home-list-container.component';
import { HomesRoutingModule } from './homes-routing.module';

@NgModule({
  declarations: [HomeListContainerComponent],
  imports: [
    CommonModule,
    HomesRoutingModule
  ]
})
export class HomesModule { }

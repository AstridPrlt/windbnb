import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AccomodationsRoutingModule } from './accomodations-routing.module';
import { AccomodationsComponent } from './accomodations.component';
import { ListComponent } from './list/list.component';
import { SearchComponent } from './search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardAccomodationComponent } from './list/card-accomodation/card-accomodation.component';
import { AccomodationDetailsComponent } from './list/accomodation-details/accomodation-details.component';

const routes: Routes = [
  { path: '', component: AccomodationsComponent }
];

@NgModule({
  declarations: [
    AccomodationsComponent,
    ListComponent,
    SearchComponent,
    CardAccomodationComponent,
    AccomodationDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AccomodationsRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    RouterModule
  ]
})
export class AccomodationsModule { }

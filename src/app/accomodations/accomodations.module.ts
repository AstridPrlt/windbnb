import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AccomodationsRoutingModule } from './accomodations-routing.module';
import { AccomodationsComponent } from './accomodations.component';
import { ListComponent } from './list/list.component';
import { SearchComponent } from './search/search.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: AccomodationsComponent }
];

@NgModule({
  declarations: [
    AccomodationsComponent,
    ListComponent,
    SearchComponent
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AccomodationsRoutingModule } from './accomodations-routing.module';
import { AccomodationsComponent } from './accomodations.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: '', component: AccomodationsComponent }
];

@NgModule({
  declarations: [
    AccomodationsComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AccomodationsRoutingModule
  ],
  exports: [
    RouterModule
  ]
})
export class AccomodationsModule { }

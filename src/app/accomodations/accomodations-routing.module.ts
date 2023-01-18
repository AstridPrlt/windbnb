import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccomodationDetailsComponent } from './list/accomodation-details/accomodation-details.component';

const routes: Routes = [
  {path: 'room/:id', component: AccomodationDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccomodationsRoutingModule { }

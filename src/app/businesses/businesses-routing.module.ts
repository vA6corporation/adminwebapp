import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessesComponent } from './businesses/businesses.component';
import { DisabledComponent } from './disabled/disabled.component';

const routes: Routes = [
  { path: '', component: BusinessesComponent },
  { path: 'disabled', component: DisabledComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessesRoutingModule { }

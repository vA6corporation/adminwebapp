import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessesRoutingModule } from './businesses-routing.module';
import { BusinessesComponent } from './businesses/businesses.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DisabledComponent } from './disabled/disabled.component';
import { DialogBusinessesComponent } from './dialog-businesses/dialog-businesses.component';
import { DialogObservationsComponent } from './dialog-observations/dialog-observations.component';
import { DialogSummaryBadCdrsComponent } from './dialog-summary-bad-cdrs/dialog-summary-bad-cdrs.component';


@NgModule({
  declarations: [
    BusinessesComponent,
    DisabledComponent,
    DialogBusinessesComponent,
    DialogObservationsComponent,
    DialogSummaryBadCdrsComponent
  ],
  imports: [
    CommonModule,
    BusinessesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class BusinessesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports/reports.component';
import { SingupComponent } from './singup/singup.component';
import { MaterialModule } from '../material.module';
import { BillingComponent } from './billing/billing.component';
import { ActivitiesComponent } from './activities/activities.component';
import { CollectionsComponent } from './collections/collections.component';
import { WorkersComponent } from './workers/workers.component';
import { ProductsComponent } from './products/products.component';
import { IncomesComponent } from './incomes/incomes.component';


@NgModule({
  declarations: [
    ReportsComponent,
    SingupComponent,
    BillingComponent,
    ActivitiesComponent,
    CollectionsComponent,
    WorkersComponent,
    ProductsComponent,
    IncomesComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    MaterialModule
  ]
})
export class ReportsModule { }

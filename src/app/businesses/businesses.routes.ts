import { Routes } from '@angular/router';
import { BusinessesComponent } from './businesses/businesses.component';
import { DisabledComponent } from './disabled/disabled.component';

export const routes: Routes = [
    { path: '', component: BusinessesComponent },
    { path: 'disabled', component: DisabledComponent },
];

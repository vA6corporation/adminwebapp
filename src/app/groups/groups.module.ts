import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups/groups.component';
import { EditGroupsComponent } from './edit-groups/edit-groups.component';
import { MaterialModule } from '../material.module';
import { DialogAddBusinessesComponent } from './dialog-add-businesses/dialog-add-businesses.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GroupsComponent,
    EditGroupsComponent,
    DialogAddBusinessesComponent
  ],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class GroupsModule { }

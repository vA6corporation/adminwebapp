import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from './groups/groups.component';
import { EditGroupsComponent } from './edit-groups/edit-groups.component';

const routes: Routes = [
  { path: '', component: GroupsComponent },
  { path: ':groupId/edit', component: EditGroupsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }

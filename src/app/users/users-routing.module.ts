import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { CreateUsersComponent } from './create-users/create-users.component';
import { EditUsersComponent } from './edit-users/edit-users.component';
import { PrivilegesComponent } from './privileges/privileges.component';

const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'create', component: CreateUsersComponent },
  { path: ':userId/edit', component: EditUsersComponent },
  { path: ':userId/privileges', component: PrivilegesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }

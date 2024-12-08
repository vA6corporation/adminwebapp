import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SetOfficeComponent } from './set-office/set-office.component';
import { LogoutComponent } from './logout/logout.component';
import { DialogDebtorComponent } from './dialog-debtor/dialog-debtor.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    SetOfficeComponent,
    LogoutComponent,
    DialogDebtorComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule { }

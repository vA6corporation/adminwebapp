import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificatesRoutingModule } from './certificates-routing.module';
import { CertificatesComponent } from './certificates/certificates.component';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [
    CertificatesComponent
  ],
  imports: [
    CommonModule,
    CertificatesRoutingModule,
    MaterialModule
  ]
})
export class CertificatesModule { }

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { WorkersService } from '../workers.service';

@Component({
  selector: 'app-create-workers',
  templateUrl: './create-workers.component.html',
  styleUrls: ['./create-workers.component.sass']
})
export class CreateWorkersComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly workersService: WorkersService,
    private readonly navigationService: NavigationService,
    private readonly router: Router,
  ) { }
    
  public formGroup: FormGroup = this.formBuilder.group({
    documentType: [ 'DNI', Validators.required ],
    document: [ null, Validators.required ],
    name: [ null, Validators.required ],
    mobileNumber: [ null, Validators.required ],
    birthDate: null,
    address: null,    
  });
  public isLoading: boolean = false;
  public maxLength: number = 11;
  
  ngOnInit(): void { 
    this.navigationService.setTitle('Nuevo personal');
    this.navigationService.backTo();
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadSpinnerStart();
      this.workersService.create(this.formGroup.value).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.navigationService.loadSpinnerFinish();
        this.router.navigate(['/workers']);
        this.workersService.clearWorkers();
        this.navigationService.showMessage('Registrado correctamente');
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.navigationService.loadSpinnerFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }


}

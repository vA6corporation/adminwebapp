import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WorkersService } from '../workers.service';
import { NavigationService } from '../../navigation/navigation.service';

@Component({
    selector: 'app-create-workers',
    templateUrl: './create-workers.component.html',
    styleUrls: ['./create-workers.component.sass'],
    standalone: false
})
export class CreateWorkersComponent {

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly workersService: WorkersService,
        private readonly navigationService: NavigationService,
        private readonly router: Router,
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        documentType: ['DNI', Validators.required],
        document: [null, Validators.required],
        name: [null, Validators.required],
        mobileNumber: [null, Validators.required],
        birthDate: null,
        address: null,
    })
    isLoading: boolean = false
    maxLength: number = 11

    ngOnInit(): void {
        this.navigationService.setTitle('Nuevo personal')
        this.navigationService.backTo()
    }

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.isLoading = true
            this.navigationService.loadBarStart()
            this.workersService.create(this.formGroup.value).subscribe({
                next: () => {
                    this.isLoading = false
                    this.navigationService.loadBarFinish()
                    this.router.navigate(['/workers'])
                    this.workersService.clearWorkers()
                    this.navigationService.showMessage('Registrado correctamente')
                }, error: (error: HttpErrorResponse) => {
                    this.isLoading = false
                    this.navigationService.loadBarFinish()
                    this.navigationService.showMessage(error.error.message)
                }
            })
        }
    }


}

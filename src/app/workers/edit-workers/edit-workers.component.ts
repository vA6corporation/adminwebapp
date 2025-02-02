import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../../navigation/navigation.service';
import { WorkersService } from '../workers.service';

@Component({
    selector: 'app-edit-workers',
    templateUrl: './edit-workers.component.html',
    styleUrls: ['./edit-workers.component.sass'],
    standalone: false
})
export class EditWorkersComponent {

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly workersService: WorkersService,
        private readonly navigationService: NavigationService,
        private readonly activatedRoute: ActivatedRoute,
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        documentType: [null, Validators.required],
        document: [null, Validators.required],
        name: [null, Validators.required],
        mobileNumber: [null, Validators.required],
        birthDate: null,
        address: null,
    })
    isLoading: boolean = false
    maxLength: number = 11
    private workerId: string = ''

    ngOnInit(): void {
        this.navigationService.setTitle('Editar personal')
        this.navigationService.backTo()

        this.workerId = this.activatedRoute.snapshot.params['workerId']
        this.workersService.getWorkerById(this.workerId).subscribe(worker => {
            this.formGroup.patchValue(worker)
        })
    }

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.isLoading = true
            this.navigationService.loadBarStart
            this.workersService.update(this.formGroup.value, this.workerId).subscribe({
                next: () => {
                    this.isLoading = false
                    this.navigationService.loadBarFinish()
                    this.workersService.clearWorkers()
                    this.navigationService.showMessage('Se han guardado los cambios')
                }, error: (error: HttpErrorResponse) => {
                    this.isLoading = false
                    this.navigationService.loadBarFinish()
                    this.navigationService.showMessage(error.error.message)
                }
            })
        }
    }

}

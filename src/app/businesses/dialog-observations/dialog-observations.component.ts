import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { BusinessesService } from '../businesses.service';
import { NavigationService } from '../../navigation/navigation.service';
import { MaterialModule } from '../../material.module';

export interface DialogObservationsData {
    businessId: string
    observations: string
}

@Component({
    selector: 'app-dialog-observations',
    imports: [MaterialModule, ReactiveFormsModule],
    templateUrl: './dialog-observations.component.html',
    styleUrls: ['./dialog-observations.component.sass'],
})
export class DialogObservationsComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA)
        private readonly data: DialogObservationsData,
        private readonly formBuilder: FormBuilder,
        private readonly businessesService: BusinessesService,
        private readonly navigationService: NavigationService,
        private readonly dialogRef: MatDialogRef<DialogObservationsComponent>,
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        observations: this.data.observations,
    })
    isLoading: boolean = false
    private onUpdateObservations$: EventEmitter<string> = new EventEmitter()

    ngOnInit(): void {
    }

    handleUpdateObservations(): Observable<string> {
        return this.onUpdateObservations$.asObservable()
    }

    onDelete() {
        this.onUpdateObservations$.next('')
        this.dialogRef.close()
        this.businessesService.updateObservations(this.data.businessId, '').subscribe({
            next: () => {
                this.navigationService.showMessage('Se han guardado los cambios')
            }, error: (error: HttpErrorResponse) => {
                this.navigationService.showMessage(error.error.message)
            }
        })
    }

    onSubmit(): void {
        this.onUpdateObservations$.next(this.formGroup.value.observations)
        this.dialogRef.close()
        this.businessesService.updateObservations(this.data.businessId, this.formGroup.value.observations).subscribe(() => {
            this.navigationService.showMessage('Se han guardado los cambios')
        }, (error: HttpErrorResponse) => {
            this.navigationService.showMessage(error.error.message)
        })
    }

}

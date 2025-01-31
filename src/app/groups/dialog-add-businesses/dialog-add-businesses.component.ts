import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BusinessesService } from '../../businesses/businesses.service';
import { NavigationService } from '../../navigation/navigation.service';
import { BusinessModel } from '../../businesses/business.model';

@Component({
    selector: 'app-dialog-add-businesses',
    templateUrl: './dialog-add-businesses.component.html',
    styleUrls: ['./dialog-add-businesses.component.sass'],
    standalone: false
})
export class DialogAddBusinessesComponent {

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly businessesService: BusinessesService,
        private readonly navigationService: NavigationService,
        private readonly dialogRef: MatDialogRef<DialogAddBusinessesComponent>,
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        key: [null, Validators.required],
    })
    businesses: BusinessModel[] = []
    isLoading: boolean = false

    onSetBusiness(business: BusinessModel) {
        this.dialogRef.close(business)
    }

    onSubmit() {
        if (this.formGroup.valid) {
            const { key } = this.formGroup.value
            if (key.length > 2) {
                this.formGroup.reset()
                this.navigationService.loadBarStart()
                this.businessesService.getBusinessesByKey(key).subscribe(businesses => {
                    this.navigationService.loadBarFinish()
                    this.businesses = businesses
                })
            }
        }
    }

}

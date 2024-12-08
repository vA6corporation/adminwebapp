import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BusinessModel } from 'src/app/businesses/business.model';
import { BusinessesService } from 'src/app/businesses/businesses.service';
import { NavigationService } from 'src/app/navigation/navigation.service';

@Component({
    selector: 'app-dialog-add-businesses',
    templateUrl: './dialog-add-businesses.component.html',
    styleUrls: ['./dialog-add-businesses.component.sass']
})
export class DialogAddBusinessesComponent implements OnInit {

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly businessesService: BusinessesService,
        private readonly navigationService: NavigationService,
        private readonly dialogRef: MatDialogRef<DialogAddBusinessesComponent>,
    ) { }

    public formGroup: FormGroup = this.formBuilder.group({
        key: [null, Validators.required],
    })
    public businesses: BusinessModel[] = []
    public isLoading: boolean = false

    ngOnInit(): void {

    }

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
                    console.log(businesses)
                    this.businesses = businesses
                })
            }
        }
    }

}

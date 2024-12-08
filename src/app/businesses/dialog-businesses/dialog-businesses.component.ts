import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { BusinessModel } from '../business.model';
import { BusinessesService } from '../businesses.service';

@Component({
    selector: 'app-dialog-businesses',
    templateUrl: './dialog-businesses.component.html',
    styleUrls: ['./dialog-businesses.component.sass']
})
export class DialogBusinessesComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA)
        private readonly businessId: string,
        private readonly formBuilder: FormBuilder,
        private readonly businessesService: BusinessesService,
        private readonly navigationService: NavigationService,
        private readonly dialogRef: MatDialogRef<DialogBusinessesComponent>,
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        charge: ['', Validators.required],
        mobileNumber: ['', Validators.required],
        formatContact: '',
        businessType: '',
    })
    isLoading: boolean = false
    private business: BusinessModel | null = null

    ngOnInit(): void {
        this.businessesService.getBusinessById(this.businessId).subscribe(business => {
            this.business = business
            this.formGroup.patchValue(business)
        }, (error: HttpErrorResponse) => {
            this.navigationService.showMessage(error.error.message)
        })
    }

    onInputMobile(value: string) {
        let result = value.replace(/ /g, '')
        if (value.includes('+')) {
            result = result.slice(3)
        }
        this.formGroup.get('contact')?.patchValue(result)
        this.formGroup.get('formatContact')?.patchValue(this.formatContact(result))
    }

    formatContact(contact: string) {
        let x = 0
        let groups: any[] = []
        let len: any
        let num: any

        num = contact + ''
        num = num.replace(/\D/g, '')

        if (num.length !== 9) {
            return ''
        }

        len = num.length
        num = num.split('').reverse()

        while (x < len / 3) {
            groups[x] = num.splice(-3, 3).reverse().join('')
            x++
        }

        if (groups.length > 3) {
            groups[2] = groups[2].concat(groups.splice(3 - groups.length, 1))
        }

        return groups.join(' ')
    }

    onSubmit(): void {
        if (this.formGroup.valid && this.business) {
            Object.assign(this.business, this.formGroup.value)
            this.dialogRef.close(this.formGroup.value)
            this.businessesService.update(this.business, this.businessId).subscribe(() => {
                this.navigationService.showMessage('Se han guardado los cambios')
            }, (error: HttpErrorResponse) => {
                this.navigationService.showMessage(error.error.message)
            })
        }
    }
}

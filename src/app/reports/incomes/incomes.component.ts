import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BusinessModel } from 'src/app/businesses/business.model';
import { BusinessesService } from 'src/app/businesses/businesses.service';
import { DialogBusinessesComponent } from 'src/app/businesses/dialog-businesses/dialog-businesses.component';
import { NavigationService } from 'src/app/navigation/navigation.service';

@Component({
    selector: 'app-incomes',
    templateUrl: './incomes.component.html',
    styleUrls: ['./incomes.component.sass']
})
export class IncomesComponent implements OnInit {

    constructor(
        private readonly businessesService: BusinessesService,
        private readonly navigationService: NavigationService,
        private readonly matDialog: MatDialog,
    ) { }

    public businesses: BusinessModel[] = []
    public filterBusinesses: BusinessModel[] = []
    public businessType: string = ''

    onBusinessTypeChange() {
        if (this.businessType) {
            this.filterBusinesses = this.businesses.filter(e => e.businessType == this.businessType)
        } else {
            this.filterBusinesses = this.businesses
        }
    }

    onEditDialog(business: BusinessModel) {
        const dialogRef = this.matDialog.open(DialogBusinessesComponent, {
            width: '600px',
            position: { top: '20px' },
            data: business._id,
        });

        dialogRef.afterClosed().subscribe(updateBusiness => {
            if (updateBusiness) {
                Object.assign(business, updateBusiness);
                if (this.businessType) {
                    this.filterBusinesses = this.businesses.filter(e => e.businessType == this.businessType)
                } else {
                    this.filterBusinesses = this.businesses
                }
            }
        });
    }

    ngOnInit(): void {
        this.navigationService.loadBarStart();
        this.businessesService.getMonthlyIncomeBusinesses().subscribe(businesses => {
            this.navigationService.loadBarFinish();
            this.businesses = businesses;
            if (this.businessType) {
                this.filterBusinesses = businesses.filter(e => e.businessType == this.businessType)
            } else {
                this.filterBusinesses = businesses
            }
        });
    }
}

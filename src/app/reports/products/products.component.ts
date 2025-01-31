import { Component } from '@angular/core';
import { BusinessesService } from '../../businesses/businesses.service';
import { NavigationService } from '../../navigation/navigation.service';
import { BusinessModel } from '../../businesses/business.model';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.sass'],
    standalone: false
})
export class ProductsComponent {

    constructor(
        private readonly businessesService: BusinessesService,
        private readonly navigationService: NavigationService,
    ) { }

    businesses: BusinessModel[] = []

    ngOnInit(): void {
        this.navigationService.loadBarStart()
        this.businessesService.getInfoBusinesses().subscribe(businesses => {
            this.navigationService.loadBarFinish()
            this.businesses = businesses
        })
    }
}

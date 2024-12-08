import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BusinessModel } from 'src/app/businesses/business.model';
import { BusinessesService } from 'src/app/businesses/businesses.service';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { UserModel } from 'src/app/users/user.model';
import { UsersService } from 'src/app/users/users.service';

@Component({
    selector: 'app-certificates',
    templateUrl: './certificates.component.html',
    styleUrls: ['./certificates.component.sass']
})
export class CertificatesComponent implements OnInit {

    constructor(
        private readonly businessesService: BusinessesService,
        private readonly navigationService: NavigationService,
        private readonly usersService: UsersService,
    ) { }

    private handleCertificateBusinesses$ = new Subscription()
    businesses: BusinessModel[] = []
    business: BusinessModel | null = null
    user: UserModel | null = null
    isLoading: boolean = false

    ngOnDestroy() {
        this.handleCertificateBusinesses$.unsubscribe()
    }

    ngOnInit(): void {
        this.navigationService.setTitle('Certificados')
        this.handleCertificateBusinesses$ = this.businessesService.handleCertificateBusinesses().subscribe(businesses => {
            this.businesses = businesses
        })
    }

    onDisable(businessId: string) {
        const ok = confirm('Esta seguro de desactivar')
        if (ok) {
            this.navigationService.loadBarStart()
            this.businessesService.disableBusiness(businessId).subscribe(() => {
                this.navigationService.loadBarFinish()
                this.businesses = this.businesses.filter(e => e._id !== businessId)
            })
        }
    }

    onOpenPanel(business: BusinessModel) {
        this.business = business
        this.isLoading = true
        this.usersService.getAdminUserByBusinessId(business._id).subscribe(user => {
            this.user = user
            this.isLoading = false
        }, (error: HttpErrorResponse) => {
            this.isLoading = false
            this.navigationService.loadBarFinish()
            this.navigationService.showMessage(error.error.message)
        })
    }

}

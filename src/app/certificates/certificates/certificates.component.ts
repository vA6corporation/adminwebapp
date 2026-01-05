import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { BusinessesService } from '../../businesses/businesses.service';
import { NavigationService } from '../../navigation/navigation.service';
import { UsersService } from '../../users/users.service';
import { BusinessModel } from '../../businesses/business.model';
import { UserModel } from '../../users/user.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-certificates',
    templateUrl: './certificates.component.html',
    styleUrls: ['./certificates.component.sass'],
    standalone: false
})
export class CertificatesComponent {

    constructor(
        private readonly businessesService: BusinessesService,
        private readonly navigationService: NavigationService,
        private readonly usersService: UsersService,
        readonly sanitizer: DomSanitizer
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

    expirationAt(expirationAt: string) {
        const today = new Date()
        const updateDate = new Date(expirationAt)
        var diffMs = (updateDate.getTime() - today.getTime())
        var diffDays = Math.floor(diffMs / 86400000) // days
        if (diffDays > 0) {
            return `${diffDays} dias`
        }
        return 'Ya vencio'
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
        this.usersService.getAdminUserByBusinessId(business._id).subscribe({
            next: user => {
                this.user = user
                this.isLoading = false
            }, error: (error: HttpErrorResponse) => {
                this.isLoading = false
                this.navigationService.loadBarFinish()
                this.navigationService.showMessage(error.error.message)
            }
        })
    }

}

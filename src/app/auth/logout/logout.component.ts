import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { OfficeModel } from '../office.model';
import { NavigationService } from '../../navigation/navigation.service';
import { UserModel } from '../../users/user.model';
import { BusinessModel } from '../../businesses/business.model';
import { MaterialModule } from '../../material.module';

@Component({
    selector: 'app-logout',
    imports: [MaterialModule],
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.sass'],
})
export class LogoutComponent {

    constructor(
        private readonly router: Router,
        private readonly authService: AuthService,
        private readonly navigationService: NavigationService,
    ) { }

    private user$: Subscription = new Subscription()

    offices: OfficeModel[] = []
    user: UserModel = new UserModel()
    business: BusinessModel = this.authService.getBusiness()
    businesses: BusinessModel[] = []

    ngOnDestroy() {
        this.user$.unsubscribe()
    }

    ngOnInit(): void {
        this.offices = this.authService.getOffices()
        this.navigationService.setTitle('Cerrar sesion')
    }

    onOfficeSelected(office: OfficeModel) {
        this.authService.setOffice(office).subscribe(res => {
            this.authService.setAccessToken(res.accessToken)
            this.router.navigate(['']).then(() => {
                location.reload()
            })
        })
    }

    onBusinessOfficeSelected(business: BusinessModel, office: OfficeModel) {
        this.authService.setOfficeBusiness(business, office).subscribe(res => {
            this.authService.setAccessToken(res.accessToken)
            this.router.navigate(['']).then(() => {
                location.reload()
            })
        })
    }

    onLogout() {
        this.authService.logout()
    }

}

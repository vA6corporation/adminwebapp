import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { OfficeModel } from '../../auth/office.model';
import { BusinessModel } from '../../businesses/business.model';
import { MaterialModule } from '../../material.module';
import { UserModel } from '../../users/user.model';

@Component({
    selector: 'app-sidenav-list',
    imports: [MaterialModule, RouterModule],
    templateUrl: './sidenav-list.component.html',
    styleUrls: ['./sidenav-list.component.sass'],
})
export class SidenavListComponent {

    constructor(
        private readonly authService: AuthService,
    ) { }

    @Output()
    sidenavClose = new EventEmitter<void>()

    private activeModules$: Subscription = new Subscription()
    private user$: Subscription = new Subscription()
    private business$: Subscription = new Subscription()
    private office$: Subscription = new Subscription()

    user: UserModel | null = null
    business: BusinessModel | null = null
    office: OfficeModel | null = null

    ngOnDestroy(): void {
        this.activeModules$.unsubscribe()
        this.business$.unsubscribe()
        this.office$.unsubscribe()
        this.user$.unsubscribe()
    }

    ngOnInit(): void {
        this.authService.getUser().subscribe(user => {
            this.user = user
        })

        this.authService.getObservableBusiness().subscribe(business => {
            this.business = business
        })

        this.authService.getObservableOffice().subscribe(office => {
            this.office = office
        })
    }

    isActive(): boolean {
        return true
    }

    onClose(): void {
        this.sidenavClose.emit()
    }

    onLogout(): void {
        this.authService.logout()
        this.sidenavClose.emit()
    }

}

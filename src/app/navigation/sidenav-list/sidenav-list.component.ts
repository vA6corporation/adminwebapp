import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { OfficeModel } from 'src/app/auth/office.model';
import { BusinessModel } from 'src/app/businesses/business.model';
import { UserModel } from 'src/app/users/user.model';
import { ModuleModel } from '../module.model';
import { BusinessesService } from 'src/app/businesses/businesses.service';

@Component({
    selector: 'app-sidenav-list',
    templateUrl: './sidenav-list.component.html',
    styleUrls: ['./sidenav-list.component.sass']
})
export class SidenavListComponent implements OnInit {

    constructor(
        private readonly authService: AuthService,
        private readonly businessesService: BusinessesService,
    ) { }

    @Output()
    sidenavClose = new EventEmitter<void>();

    private activeModules$: Subscription = new Subscription();
    private user$: Subscription = new Subscription();
    private business$: Subscription = new Subscription();
    private office$: Subscription = new Subscription();
    private handleCertificateBusinesses$: Subscription = new Subscription()
    businesses: BusinessModel[] = []

    // activeModules: ModuleModel[] = [];
    user: UserModel | null = null;
    business: BusinessModel | null = null;
    office: OfficeModel | null = null;

    ngOnDestroy(): void {
        this.activeModules$.unsubscribe();
        this.handleCertificateBusinesses$.unsubscribe()
        this.user$.unsubscribe();
        this.business$.unsubscribe();
        this.office$.unsubscribe();
    }

    ngOnInit(): void {
        // this.authService.getActiveModules().subscribe(activeModules => {
        //     this.activeModules = activeModules;
        // });
        this.authService.getAuthChange().subscribe(authState => {
            if (authState) {
                this.handleCertificateBusinesses$ = this.businessesService.handleCertificateBusinesses().subscribe(businesses => {
                    this.businesses = businesses
                });
            }
        });

        this.authService.getUser().subscribe(user => {
            this.user = user;
        });

        this.authService.getObservableBusiness().subscribe(business => {
            this.business = business;
        });

        this.authService.getObservableOffice().subscribe(office => {
            this.office = office;
        });
    }

    isActive(): boolean {
        return true;
    }

    onClose(): void {
        this.sidenavClose.emit();
    }

    onLogout(): void {
        this.authService.logout();
        this.sidenavClose.emit();
    }

}

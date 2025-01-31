import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { MaterialModule } from './material.module';
import { NavigationService } from './navigation/navigation.service';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { ToolbarComponent } from './navigation/toolbar/toolbar.component';
import { BusinessModel } from './businesses/business.model';
import { Subscription } from 'rxjs';
import { BusinessesService } from './businesses/businesses.service';

@Component({
    selector: 'app-root',
    imports: [MaterialModule, SidenavListComponent, RouterModule, ToolbarComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass'],
})
export class AppComponent {

    constructor(
        private readonly navigationService: NavigationService,
        private readonly businessesService: BusinessesService,
        private readonly authService: AuthService,
        private readonly router: Router,
    ) { }

    title = 'KramviAdmin'
    isStart: boolean = false
    currentPath: string = ''
    businesses: BusinessModel[] = []
    
    private handleCertificateBusinesses$: Subscription = new Subscription()

    ngOnDestroy() {
        this.handleCertificateBusinesses$.unsubscribe()
    }   

    ngOnInit() {
        const accessToken = localStorage.getItem('accessToken')
        this.authService.getSession(accessToken).subscribe({
            next: user => {
                this.authService.setAccessToken(accessToken)
                this.authService.loggedIn()
                this.isStart = true
                this.authService.setUser(user)
            }, error: (error: HttpErrorResponse) => {
                this.isStart = true
            }
        })

        this.authService.handleAuthChange().subscribe(authState => {
            if (authState) {
                this.handleCertificateBusinesses$ = this.businessesService.handleCertificateBusinesses().subscribe(businesses => {
                    this.businesses = businesses
                })
            }
        })

        this.router.events.forEach(event => {
            if (event instanceof NavigationEnd) {
                if (this.currentPath !== this.router.url.split('?')[0]) {
                    this.navigationService.setMenu([])
                    this.navigationService.isMainToolbar()
                }
                this.currentPath = this.router.url.split('?')[0]
            }
        })
    }

}

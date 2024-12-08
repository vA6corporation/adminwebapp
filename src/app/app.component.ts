import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { NavigationService } from './navigation/navigation.service';
import { BusinessesService } from './businesses/businesses.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent {

    constructor(
        private readonly navigationService: NavigationService,
        private readonly businessesService: BusinessesService,
        private readonly authService: AuthService,
        private readonly router: Router,
    ) { }

    title = 'KramviAdmin';
    isStart: boolean = false;
    currentPath: string = '';

    ngOnInit() {
        const accessToken = localStorage.getItem('accessToken')
        this.authService.getSession(accessToken).subscribe(user => {
            this.navigationService.loadSpinnerFinish()
            this.authService.setAccessToken(accessToken)
            this.authService.loggedIn()
            this.isStart = true
            this.authService.setUser(user)
        }, (error: HttpErrorResponse) => {
            console.log(error)
            this.router.navigate(['/login'])
            this.navigationService.loadSpinnerFinish()
            this.isStart = true
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

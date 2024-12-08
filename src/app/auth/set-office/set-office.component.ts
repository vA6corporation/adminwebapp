import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BusinessModel } from 'src/app/businesses/business.model';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { UserModel } from 'src/app/users/user.model';
import { AuthService } from '../auth.service';
import { OfficeModel } from '../office.model';

@Component({
  selector: 'app-set-office',
  templateUrl: './set-office.component.html',
  styleUrls: ['./set-office.component.sass']
})
export class SetOfficeComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly navigationService: NavigationService,
  ) { }

  private user$: Subscription = new Subscription();

  public offices: OfficeModel[] = [];
  public user: UserModel = new UserModel();
  public business: BusinessModel = this.authService.getBusiness();
  public businesses: BusinessModel[] = [];

  ngOnDestroy() {
    this.user$.unsubscribe();
  }

  ngOnInit(): void {
    this.navigationService.setTitle('Sucursales');
    this.navigationService.backTo();

    this.user$ = this.authService.getUser().subscribe(user => {
      this.user = this.user;
    });

    if (this.business.groupId) {
      this.authService.loadBusinessesByGroup(this.business.groupId).subscribe(businesses => {
        console.log(businesses);
        this.businesses = businesses;
      });
    } else {
      this.authService.getActiveOffices().subscribe(offices => {
        console.log(offices);
        this.offices = offices;
      });
    }
  }

  onOfficeSelected(office: OfficeModel,) {
    this.authService.setOffice(office).subscribe(res => {
      this.authService.setAccessToken(res.accessToken);
      this.router.navigate(['']).then(() => {
        location.reload();
      });
    });
  }

  onBusinessOfficeSelected(business: BusinessModel, office: OfficeModel) {
    this.authService.setOfficeBusiness(business, office).subscribe(res => {
      this.authService.setAccessToken(res.accessToken);
      this.router.navigate(['']).then(() => {
        location.reload();
      });
    });
  }

  onLogout() {
    this.authService.logout();
  }

}

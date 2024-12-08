import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { UserModel } from 'src/app/users/user.model';
import { UsersService } from 'src/app/users/users.service';
import { BusinessModel } from '../business.model';
import { BusinessesService } from '../businesses.service';

@Component({
  selector: 'app-disabled',
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.sass']
})
export class DisabledComponent implements OnInit {

  constructor(
    private readonly businessesService: BusinessesService,
    private readonly usersService: UsersService,
    private readonly navigationService: NavigationService,
    private readonly formBuilder: FormBuilder,
  ) { }

  private handleSearch$: Subscription = new Subscription();
    
  public businesses: BusinessModel[] = [];
  public businessesMarked: BusinessModel[] = [];
  public user: UserModel|null = null;
  public formBusiness: FormGroup = this.formBuilder.group({
    _id: [ null, Validators.required ],
    paymentAt: [ null, Validators.required ],
    paymentGroup: '1',
    isMarked: false
  });
  public preBusinesses: BusinessModel[] = [];
  public groupCode: string = '';
  public groupCodes: any[] = [
    { code: '', label: 'TODOS LOS GRUPOS' },
    { code: '01', label: '01' },
    { code: '10', label: '10' },
    { code: '20', label: '20' }
  ];
  private timeOutId: any = null;

  ngOnDestroy() {
    this.handleSearch$.unsubscribe();
  }

  ngOnInit(): void {
    this.navigationService.setTitle('Desactivados');

    this.navigationService.setMenu([
      { id: 'search', label: 'Buscar', icon: 'search', show: true },
    ]);

    this.handleSearch$ = this.navigationService.handleInputSearch().subscribe(key => {
      if (key && key.length > 1) {
        clearTimeout(this.timeOutId);
        this.timeOutId = setTimeout(() => {
          const regExp = new RegExp(key, 'i');
          this.businesses = this.preBusinesses.filter(e => {
            let ok = null; 
            if (e.businessName.match(regExp)) {
              ok = true;
            }
            if (e.ruc.includes(key)) {
              ok = true;
            }
            for (const office of e.offices) {
              if (office.tradeName.match(regExp)) {
                ok = true;
              }
            }
            return ok;
          });
        }, 500);
      } else {
        this.businesses = this.preBusinesses;
      }
    });

    this.fetchData();
  }

  onOpenPanel(business: BusinessModel) {
    console.log(business);
    this.formBusiness.patchValue(business);
    this.usersService.getAdminUserByBusinessId(business._id).subscribe(user => {
      this.user = user;
    }, (error: HttpErrorResponse) => {
      this.navigationService.loadBarFinish();
      this.navigationService.showMessage(error.error.message);
    });
  }

  onEnable(businessId: string) {
    const ok = confirm('Esta seguro de activar?...');
    if (ok) {
      this.businesses = this.businesses.filter(e => e._id !== businessId);
      this.businessesService.activeBusiness(businessId).subscribe(() => {
        this.navigationService.showMessage('Se han guardado los cambios');
      }, (error: HttpErrorResponse) => {
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

  onUpdateBusiness() {
    if (this.formBusiness.valid) {
      const { _id } = this.formBusiness.value;
      this.navigationService.loadBarStart();
      this.businessesService.update(this.formBusiness.value, _id).subscribe(() => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage('Se han guardado los cambios');
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

  fetchData() {
    this.navigationService.loadBarStart();
    this.businessesService.getDisabledBusinesses().subscribe(businesses => {
      console.log(businesses);
      this.navigationService.loadBarFinish();
      this.businesses = businesses;
      this.preBusinesses = businesses;
      this.businessesMarked = businesses.filter(e => e.isMarked);
    }, (error: HttpErrorResponse) => {
      this.navigationService.loadBarFinish();
      this.navigationService.showMessage(error.error.message);
    });
  }

}

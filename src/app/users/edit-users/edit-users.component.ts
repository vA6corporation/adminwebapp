import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { OfficeModel } from 'src/app/auth/office.model';
import { BusinessModel } from 'src/app/businesses/business.model';
import { NavigationService } from 'src/app/navigation/navigation.service';
// import { OfficesService } from 'src/app/offices/offices.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.sass']
})
export class EditUsersComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly usersService: UsersService,
    private readonly matSnackBar: MatSnackBar,
    private readonly navigationService: NavigationService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly officesService: OfficesService,
    private readonly authService: AuthService,
  ) {
    this.formGroup = this.formBuilder.group({
      name: [ null, Validators.required ],
      email: [ null, [ Validators.required, Validators.email ] ],
      password: [ null, Validators.required ],
      assignedOfficeId: null,
      isActive: false,
    });

    this.activatedRoute.params.subscribe(async params => {
      this.userId = params.userId;
      this.usersService.getUserById(this.userId).subscribe(user => {
        console.log(user);
        this.formGroup.patchValue(user);
      });
    });
  }

  public formGroup: FormGroup;
  private userId: string = '';
  public isLoading: boolean = false;
  public offices: OfficeModel[] = [];
  public hide: boolean = true;
  private business: BusinessModel = this.authService.getBusiness();

  ngOnInit(): void {
    this.navigationService.setTitle('Editar usuario');
    this.navigationService.backTo();
    if (this.business.groupId) {
      this.officesService.getOfficesByGroup(this.business.groupId).subscribe(offices => {
        this.offices = offices;
      });
    } else {
      this.officesService.getOffices().subscribe(offices => {
        this.offices = offices;
      });
    }
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadSpinnerStart();
      this.usersService.update(this.formGroup.value, this.userId).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.navigationService.loadSpinnerFinish();
        this.matSnackBar.open('Se han guardado los cambios', 'Aceptar', {
          duration: 5000,
        });
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.navigationService.loadSpinnerFinish();
        this.matSnackBar.open(error.error.message, 'Aceptar', {
          duration: 5000,
        });
      });
    }
  }
}

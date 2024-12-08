import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UserModel } from 'src/app/users/user.model';
import { ModuleModel } from 'src/app/navigation/module.model';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { UsersService } from '../users.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-privileges',
  templateUrl: './privileges.component.html',
  styleUrls: ['./privileges.component.sass']
})
export class PrivilegesComponent implements OnInit {

  constructor(
    private readonly navigationService: NavigationService,
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly usersService: UsersService,
    private readonly route: ActivatedRoute,
  ) { 
    this.formGroup = this.formBuilder.group(this.authService.getObjectModules());
  }

  public activeModules$: Subscription = new Subscription();
  public activeModules: ModuleModel[] = [];
  public formGroup: FormGroup;
  public user: UserModel = new UserModel();
  public isLoading: boolean = false;

  ngOnInit(): void {
    this.navigationService.backTo();
    this.activeModules$ = this.authService.getActiveModules().subscribe(activeModules => {
      this.activeModules = activeModules;
      this.route.params.subscribe(params => {
        this.usersService.getUserById(params.userId).subscribe(user => {
          this.navigationService.setTitle(`Permisos ${user.name}`);
          console.log(user);
          this.user = user;
          for (const module of this.activeModules) {
            if (module.name in user.privileges && user.privileges[module.name] === true)
            this.formGroup.get(module.name)?.setValue(true);
          }
        });
      });
    });
  }

  onSubmit() {
    this.user.privileges = this.formGroup.value;
    this.isLoading = true;
    this.usersService.updatePrivileges(this.user, this.user._id).subscribe(() => {
      this.navigationService.showMessage('Se han guardado los cambios');
      this.isLoading = false;
    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.activeModules$.unsubscribe();
  }

}

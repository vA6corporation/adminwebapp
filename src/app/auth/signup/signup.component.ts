import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NavigationService } from '../../navigation/navigation.service';
import { MaterialModule } from '../../material.module';

@Component({
    selector: 'app-signup',
    imports: [MaterialModule, ReactiveFormsModule],
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.sass'],
})
export class SignupComponent {

    constructor(
        private readonly matSnackBar: MatSnackBar,
        private readonly authService: AuthService,
        private readonly formBuilder: FormBuilder,
        private readonly navigationService: NavigationService,
        private readonly router: Router,
    ) {
        this.signupForm = this.formBuilder.group({
            user: this.formBuilder.group({
                email: [null, [Validators.required, Validators.email]],
                isAdmin: true,
            }),
            business: this.formBuilder.group({
                businessName: [null, Validators.required],
                tradeName: [null, Validators.required],
                ruc: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
            }),
        })
    }

    signupForm: FormGroup
    isLoading: boolean = false

    ngOnInit(): void { }

    onSubmit() {
        if (this.signupForm.valid) {
            this.isLoading = true
            this.navigationService.loadBarStart()
            const { business, user } = this.signupForm.value
            this.authService.register(business, user).subscribe(res => {
                this.isLoading = false
                this.navigationService.loadBarFinish()
                this.router.navigate(['/login'])
                this.matSnackBar.open('Registrado correctamente', 'Aceptar', {
                    duration: 5000,
                })
            }, (error: HttpErrorResponse) => {
                this.isLoading = false
                this.navigationService.loadBarFinish()
                this.matSnackBar.open(error.error.message, 'Aceptar', {
                    duration: 5000,
                })
            })
        }
    }

}

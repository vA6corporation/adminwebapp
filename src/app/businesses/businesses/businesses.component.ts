import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { BusinessModel } from '../business.model';
import { BusinessesService } from '../businesses.service';
import { DialogBusinessesComponent } from '../dialog-businesses/dialog-businesses.component';
import { DialogObservationsComponent, DialogObservationsData } from '../dialog-observations/dialog-observations.component';
import { DialogSummaryBadCdrsComponent } from '../dialog-summary-bad-cdrs/dialog-summary-bad-cdrs.component';
import { MaterialModule } from '../../material.module';
import { NavigationService } from '../../navigation/navigation.service';
import { WorkersService } from '../../workers/workers.service';
import { WorkerModel } from '../../workers/worker.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../users/users.service';
import { UserModel } from '../../users/user.model';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-businesses',
    imports: [MaterialModule, ReactiveFormsModule, RouterModule, CommonModule],
    templateUrl: './businesses.component.html',
    styleUrls: ['./businesses.component.sass'],
})
export class BusinessesComponent {

    constructor(
        private readonly businessesService: BusinessesService,
        private readonly navigationService: NavigationService,
        private readonly workersService: WorkersService,
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
        private readonly formBuilder: FormBuilder,
        private readonly matDialog: MatDialog,
        readonly sanitizer: DomSanitizer
    ) { }

    businesses: BusinessModel[] = []
    businessesMarked: BusinessModel[] = []
    user: UserModel | null = null
    formBusiness: FormGroup = this.formBuilder.group({
        _id: [null, Validators.required],
        paymentAt: [null, Validators.required],
        mobileNumber: null,
        charge: null,
        paymentGroup: '01',
        isMarked: false,
        workerId: ''
    })
    preBusinesses: BusinessModel[] = []
    groupCode: string = ''
    groupCodes: any[] = [
        { code: '', label: 'TODOS LOS GRUPOS' },
        { code: '01', label: '01' },
        { code: '10', label: '10' },
        { code: '20', label: '20' }
    ]
    isLoading: boolean = false
    showMarkets: boolean = false
    workers: WorkerModel[] = []
    private timeOutId: any = null
    private isShowAll: boolean = false
    private business: BusinessModel | null = null

    private handleSearch$: Subscription = new Subscription()
    private handleWorkers$: Subscription = new Subscription()
    private handleAuth$: Subscription = new Subscription()

    ngOnDestroy() {
        this.handleSearch$.unsubscribe()
        this.handleWorkers$.unsubscribe()
        this.handleAuth$.unsubscribe()
    }

    ngOnInit(): void {
        this.navigationService.setTitle('Empresas')

        this.handleAuth$ = this.authService.handleAuthChange().subscribe(isAuth => {
            if (isAuth) {
                this.businessesService.getSummaryBadCdrs().subscribe(summaryBadCdrs => {
                    if (summaryBadCdrs.length) {
                        this.matDialog.open(DialogSummaryBadCdrsComponent, {
                            width: '600px',
                            position: { top: '20px' },
                            data: summaryBadCdrs,
                        })
                    }
                })
            }
        })

        this.navigationService.setMenu([
            { id: 'search', label: 'Buscar', icon: 'search', show: true },
        ])

        this.handleSearch$ = this.navigationService.handleInputSearch().subscribe(key => {
            if (key && key.length > 1) {
                clearTimeout(this.timeOutId)
                this.timeOutId = setTimeout(() => {
                    const regExp = new RegExp(key, 'i')
                    this.businesses = this.preBusinesses.filter(e => {
                        let ok = null
                        if (e.businessName.match(regExp)) {
                            ok = true
                        }
                        if (e.ruc.includes(key)) {
                            ok = true
                        }
                        if (e.mobileNumber.includes(key)) {
                            ok = true
                        }
                        for (const office of e.offices) {
                            if (office.tradeName.match(regExp)) {
                                ok = true
                            }
                        }
                        return ok
                    })
                }, 500)
            } else {
                clearTimeout(this.timeOutId)
                this.timeOutId = setTimeout(() => {
                    if (this.isShowAll) {
                        this.businesses = this.preBusinesses
                    } else {
                        this.businesses = this.preBusinesses.slice(0, 20)
                    }
                }, 500)
            }
        })

        this.fetchData()

        this.workersService.handleWorkers().subscribe(workers => {
            this.workers = workers
        })
    }

    onClickCopy() {
        this.navigationService.showMessage('Copiado al portapapeles')
    }

    onDisableBusiness(businessId: string) {
        const ok = confirm('Esta seguro de desactivar?...')
        if (ok) {
            this.businessesService.disableBusiness(businessId).subscribe(() => {
                this.fetchData()
                this.navigationService.showMessage('Se han guardado los cambios')
            }, (error: HttpErrorResponse) => {
                this.navigationService.showMessage(error.error.message)
            })
        }
    }

    onShowAll() {
        this.businesses = this.preBusinesses
        this.isShowAll = true
    }

    onOpenPanel(business: BusinessModel) {
        this.business = business
        this.formBusiness.patchValue(business)
        this.isLoading = true
        this.usersService.getAdminUserByBusinessId(business._id).subscribe({
            next: user => {
                this.user = user
                this.isLoading = false
            }, error: (error: HttpErrorResponse) => {
                this.isLoading = false
                this.navigationService.loadBarFinish()
                this.navigationService.showMessage(error.error.message)
            }
        })
    }

    onEditDialog(businessId: string) {
        const dialogRef = this.matDialog.open(DialogBusinessesComponent, {
            width: '600px',
            position: { top: '20px' },
            data: businessId,
        })

        dialogRef.afterClosed().subscribe(business => {
            if (business && this.business) {
                Object.assign(this.business, business)
            }
        })
    }

    onObservationsDialog(business: BusinessModel) {
        const data: DialogObservationsData = {
            businessId: business._id,
            observations: business.observations,
        }
        const dialogRef = this.matDialog.open(DialogObservationsComponent, {
            width: '600px',
            position: { top: '20px' },
            data,
        })
        dialogRef.componentInstance.handleUpdateObservations().subscribe(observations => {
            Object.assign(business, { observations })
        })
    }

    isMobile() {
        if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
        ) {
            return true
        } else {
            return false
        }
    }

    onUpdateMarket(business: BusinessModel, target: MatSlideToggle) {
        if (business.isMarked) {
            const ok = confirm('Estas seguro de desmarcar?...')
            if (ok) {
                business.isMarked = false
                if (this.business) {
                    Object.assign(this.business, { isMarked: false, markedAt: new Date() })
                }
                setTimeout(() => {
                    this.businessesMarked = this.preBusinesses.filter(e => e.isMarked).sort(function (a: any, b: any) {
                        if (new Date(a.matkedAt).getTime() < new Date(b.markedAt).getTime()) {
                            return 1
                        }
                        if (new Date(a.markedAt).getTime() > new Date(b.markedAt).getTime()) {
                            return -1
                        }
                        return 0
                    })
                }, 500)
                this.onMarketBusiness(business._id, false)
            } else {
                target.checked = true
            }
        } else {
            business.markedAt = new Date()
            business.isMarked = true
            if (this.business) {
                Object.assign(this.business, { isMarked: true })
            }
            setTimeout(() => {
                this.businessesMarked = this.preBusinesses.filter(e => e.isMarked).sort(function (a: any, b: any) {
                    if (new Date(a.matkedAt).getTime() < new Date(b.markedAt).getTime()) {
                        return 1
                    }
                    if (new Date(a.markedAt).getTime() > new Date(b.markedAt).getTime()) {
                        return -1
                    }
                    return 0
                })
            }, 500)
            this.onMarketBusiness(business._id, true)
        }
    }

    onMarketBusiness(businessId: string, isMarket: boolean) {
        this.businessesService.marketBusiness(businessId, isMarket).subscribe({
            next: () => {
                this.navigationService.loadBarFinish()
                this.navigationService.showMessage('Se han guardado los cambios')
            }, error: (error: HttpErrorResponse) => {
                this.navigationService.loadBarFinish()
                this.navigationService.showMessage(error.error.message)
            }
        })
    }

    onUpdateBusiness() {
        if (this.formBusiness.valid) {
            const { _id } = this.formBusiness.value
            this.navigationService.loadBarStart()
            this.businessesService.update(this.formBusiness.value, _id).subscribe(() => {
                this.navigationService.loadBarFinish()
                this.navigationService.showMessage('Se han guardado los cambios')
                if (this.business) {
                    Object.assign(this.business, this.formBusiness.value)
                }
            }, (error: HttpErrorResponse) => {
                this.navigationService.loadBarFinish()
                this.navigationService.showMessage(error.error.message)
            })
        }
    }

    fetchData() {
        this.navigationService.loadBarStart()
        this.businessesService.getActiveBusinesses().subscribe({
            next: businesses => {
                this.navigationService.loadBarFinish()
                if (this.isShowAll) {
                    this.businesses = businesses
                } else {
                    this.businesses = businesses.slice(0, 20)
                }
                this.preBusinesses = businesses
                this.businessesMarked = businesses.filter(e => e.isMarked).sort(function (a: any, b: any) {
                    if (new Date(a.matkedAt).getTime() < new Date(b.markedAt).getTime()) {
                        return 1
                    }
                    if (new Date(a.markedAt).getTime() > new Date(b.markedAt).getTime()) {
                        return -1
                    }
                    return 0
                })
            }, error: (error: HttpErrorResponse) => {
                this.navigationService.loadBarFinish()
                this.navigationService.showMessage(error.error.message)
            }
        })
    }

}

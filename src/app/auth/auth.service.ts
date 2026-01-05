import { EventEmitter, Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { OfficeModel } from './office.model';
import { SettingsModel } from './settings.model';
import { ModuleModel } from '../navigation/module.model';
import { UserModel } from '../users/user.model';
import { BusinessModel } from '../businesses/business.model';
import { HttpService } from '../http.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    private authChange$: EventEmitter<boolean> = new EventEmitter()
    private activeModules$: Subject<ModuleModel[]> = new Subject()
    private user$: Subject<UserModel> = new Subject()
    private business$: Subject<BusinessModel> = new Subject()
    private office$: Subject<OfficeModel> = new Subject()

    private activeModules: ModuleModel[] = []
    private office: OfficeModel = new OfficeModel()
    private offices: OfficeModel[] = []
    private user: UserModel = new UserModel()
    private business: BusinessModel = new BusinessModel()
    private settings: SettingsModel = new SettingsModel()
    private modules: ModuleModel[] = [
        { label: 'Estado de caja', name: 'openBox', path: '/turns/openTurn', isActive: false, isAuthorized: false, icon: 'point_of_sale', info: 'General' },
        { label: 'Punto de venta', name: 'posStandard', path: '/posStandard', isActive: false, isAuthorized: false, icon: 'desktop_windows', info: 'Tiendas Minimarkets' },
        { label: 'Facturador', name: 'biller', path: '/biller', isActive: false, isAuthorized: false, icon: 'star' },
    ]

    private objectModules = {
        openBox: false,
        dashboard: false,
        paymentOrders: false,
    }

    getObjectModules() {
        return this.objectModules
    }

    handleAuthChange() {
        return this.authChange$.asObservable()
    }

    getSettings(): SettingsModel {
        return this.settings
    }

    setAccessToken(accessToken: string | null): void {
        this.httpService.accessToken = accessToken
        if (accessToken) {
            localStorage.setItem('accessToken', accessToken)
        } else {
            localStorage.setItem('accessToken', '')
        }
    }

    login(email: string, password: string): Observable<any> {
        return this.httpService.post('auth/login', { email, password })
    }

    loggedIn(): void {
        this.authChange$.emit(true)
    }

    loggedOut(): void {
        this.authChange$.emit(false)
    }


    register(business: any, user: any): Observable<any> {
        return this.httpService.post('businesses', { business, user })
    }

    logout(): void {
        this.setAccessToken(null)
        this.authChange$.emit(false)
        location.reload()
    }

    getSession(accessToken: string | null): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        })
        return this.httpService.get('profile', { headers })
    }

    getActiveOffices(): Observable<OfficeModel[]> {
        return this.httpService.get('offices/activeOffices')
    }

    loadBusiness(businessId: string) {
        return this.httpService.get(`businesses/byId/${businessId}`)
    }

    loadBusinessesByGroup(groupId: string) {
        return this.httpService.get(`businesses/byGroup/${groupId}`)
    }

    setOffices(offices: OfficeModel[]) {
        this.offices = offices
    }

    getUser(): Observable<UserModel> {
        setTimeout(() => {
            this.user$.next(this.user)
        })
        return this.user$.asObservable()
    }

    getOffices(): OfficeModel[] {
        return this.offices
    }

    getObservableOffice(): Observable<OfficeModel> {
        return this.office$.asObservable()
    }

    getObservableBusiness(): Observable<BusinessModel> {
        return this.business$.asObservable()
    }

    getOffice(): OfficeModel {
        return this.office
    }

    getBusiness(): BusinessModel {
        return this.business
    }

    setOffice(office: OfficeModel) {
        return this.httpService.get(`auth/setOffice/${office._id}/${office.activityId}`)
    }

    setOfficeBusiness(business: BusinessModel, office: OfficeModel) {
        return this.httpService.get(`auth/setBusinessOffice/${business._id}/${office._id}/${office.activityId}`)
    }

    getActiveModules(): Observable<ModuleModel[]> {
        setTimeout(() => {
            this.activeModules$.next(this.activeModules)
        })
        return this.activeModules$.asObservable()
    }

    getModules(): ModuleModel[] {
        return this.modules
    }

    setUser(user: UserModel): void {
        this.user = user
        this.user$.next(this.user)
    }
}

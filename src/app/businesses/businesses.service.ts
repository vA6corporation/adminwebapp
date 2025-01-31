import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { BusinessModel } from './business.model';
import { GroupModel } from './group.model';
import { HttpService } from '../http.service';

@Injectable({
    providedIn: 'root'
})
export class BusinessesService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    private certificateBusinesses: BehaviorSubject<BusinessModel[]> | null = null

    handleCertificateBusinesses() {
        if (this.certificateBusinesses === null) {
            this.certificateBusinesses = new BehaviorSubject<BusinessModel[]>([])
            this.getCertificateBusinesses().subscribe(businesses => {
                if (this.certificateBusinesses) {
                    this.certificateBusinesses.next(businesses)
                }
            })
        }
        return this.certificateBusinesses.asObservable()
    }

    getGroup(groupId: string): Observable<GroupModel> {
        return this.httpService.get(`businesses/group/byGroup/${groupId}`)
    }

    getSummaryBadCdrs(): Observable<any[]> {
        return this.httpService.get('tools/summaryBadCdrs')
    }

    getBusinessById(businessId: string): Observable<BusinessModel> {
        return this.httpService.get(`businesses/byId/${businessId}`)
    }

    getActiveBusinesses(): Observable<BusinessModel[]> {
        return this.httpService.get('businesses/active')
    }

    getInfoBusinesses(): Observable<BusinessModel[]> {
        return this.httpService.get('businesses/info')
    }

    getMonthlyIncomeBusinesses(): Observable<BusinessModel[]> {
        return this.httpService.get('businesses/monthlyIncomeBusinesses')
    }

    getCertificateBusinesses(): Observable<BusinessModel[]> {
        return this.httpService.get('businesses/certificates')
    }

    getDisabledBusinesses(): Observable<BusinessModel[]> {
        return this.httpService.get('businesses/disabled')
    }

    getBusinessesByGroup(groupId: string): Observable<BusinessModel[]> {
        return this.httpService.get(`businesses/byGroup/${groupId}`)
    }

    getBusinessesByKey(key: string): Observable<BusinessModel[]> {
        return this.httpService.get(`businesses/byKey/${key}`)
    }

    update(business: any, businessId: string): Observable<void> {
        return this.httpService.put(`businesses/paymentAt/${businessId}`, { business })
    }

    updateGroup(businessId: string, groupId: string): Observable<void> {
        return this.httpService.put(`businesses/updateGroup/${businessId}/${groupId}`, {})
    }

    updateGroupData(groupId: string, group: any): Observable<void> {
        return this.httpService.put(`businesses/updateGroupData/${groupId}`, { group })
    }

    updateObservations(businessId: string, observations: string): Observable<void> {
        const params: Params = { observations }
        return this.httpService.get(`businesses/observation/${businessId}`, { params })
    }

    marketBusiness(businessId: string, isMarked: boolean): Observable<void> {
        return this.httpService.get(`businesses/market/${businessId}/${isMarked}`)
    }

    activeBusiness(businessId: string): Observable<void> {
        return this.httpService.get(`businesses/active/${businessId}`)
    }

    disableBusiness(businessId: string): Observable<void> {
        return this.httpService.get(`businesses/disable/${businessId}`)
    }

}
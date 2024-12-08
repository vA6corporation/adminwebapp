import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getBusinessSingupByYear(year: number): Observable<any[]> {
    return this.httpService.get(`businesses/byYear/${year}`);
  }

  getBillingByYear(year: number): Observable<any[]> {
    return this.httpService.get(`sales/byYear/${year}`);
  }
  
  getActivities(): Observable<any[]> {
    return this.httpService.get(`sales/activities`);
  }

}

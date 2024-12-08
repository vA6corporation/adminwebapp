import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BusinessesService } from 'src/app/businesses/businesses.service';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { ReportsService } from '../reports.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.sass']
})
export class ActivitiesComponent implements OnInit {

  constructor(
    private readonly reportsService: ReportsService,
    private readonly navigationService: NavigationService,
    private readonly businessService: BusinessesService,
  ) { }

  public summaries: any[] = [];

  ngOnInit(): void {
    this.fetchData();
  }
  
  fetchData() {
    this.navigationService.loadBarStart();
    this.reportsService.getActivities().subscribe(summaries => {
      this.navigationService.loadBarFinish();
      this.summaries = summaries;
    }, (error: HttpErrorResponse) => {
      this.navigationService.showMessage(error.error.message);
    });
  }

  onDisable(businessId: string) {
    const ok = confirm('Esta seguro de desactivar?...');
    if (ok) {
      this.summaries = this.summaries.filter(e => e._id !== businessId);
      this.businessService.disableBusiness(businessId).subscribe(() => {
        this.navigationService.showMessage('Se han guardado los cambios');
      }, (error: HttpErrorResponse) => {
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

}

import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReportsService } from '../reports.service';
import { NavigationService } from '../../navigation/navigation.service';
import { BusinessesService } from '../../businesses/businesses.service';

@Component({
    selector: 'app-activities',
    templateUrl: './activities.component.html',
    styleUrls: ['./activities.component.sass'],
    standalone: false
})
export class ActivitiesComponent {

    constructor(
        private readonly reportsService: ReportsService,
        private readonly navigationService: NavigationService,
        private readonly businessService: BusinessesService,
    ) { }

    summaries: any[] = []

    ngOnInit(): void {
        this.fetchData()
    }

    fetchData() {
        this.navigationService.loadBarStart()
        this.reportsService.getActivities().subscribe(summaries => {
            this.navigationService.loadBarFinish()
            this.summaries = summaries
        })
    }

    onDisable(businessId: string) {
        const ok = confirm('Esta seguro de desactivar?...')
        if (ok) {
            this.summaries = this.summaries.filter(e => e._id !== businessId)
            this.businessService.disableBusiness(businessId).subscribe({
                next: () => {
                    this.navigationService.showMessage('Se han guardado los cambios')
                }, error: (error: HttpErrorResponse) => {
                    this.navigationService.showMessage(error.error.message)
                }
            })
        }
    }

}

import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { WorkerModel } from '../worker.model';
import { WorkersService } from '../workers.service';
import { NavigationService } from '../../navigation/navigation.service';

@Component({
    selector: 'app-workers',
    templateUrl: './workers.component.html',
    styleUrls: ['./workers.component.sass'],
    standalone: false
})
export class WorkersComponent {

    constructor(
        private readonly workersService: WorkersService,
        private readonly navigationService: NavigationService,
    ) { }

    displayedColumns: string[] = ['document', 'name', 'mobileNumber', 'actions']
    dataSource: WorkerModel[] = []
    length: number = 0
    pageSize: number = 10
    pageSizeOptions: number[] = [10, 30, 50]
    pageIndex: number = 0

    ngOnInit(): void {
        this.navigationService.setTitle('Personal')
        this.workersService.getWorkersCount().subscribe(count => {
            this.length = count
        })

        this.navigationService.loadBarStart()
        this.workersService.getWorkersByPage(this.pageIndex + 1, this.pageSize).subscribe(workers => {
            this.navigationService.loadBarFinish()
            this.dataSource = workers
        })
    }

    onDeleteWorker(workerId: string) {
        const ok = confirm('Esta seguro de anular?...')
        if (ok) {
            this.navigationService.loadBarStart()
            this.workersService.delete(workerId).subscribe({
                next: () => {
                    this.navigationService.loadBarFinish()
                    this.navigationService.showMessage('Anulado correctamente')
                    this.dataSource = this.dataSource.filter(e => e._id !== workerId)
                }, error: (error: HttpErrorResponse) => {
                    this.navigationService.loadBarFinish()
                    this.navigationService.showMessage(error.error.message)
                }
            })
        }
    }

    handlePageEvent(event: PageEvent): void {
        this.navigationService.loadBarStart()
        this.workersService.getWorkersByPage(event.pageIndex + 1, event.pageSize).subscribe({
            next: workers => {
                this.dataSource = workers
            }, error: (error: HttpErrorResponse) => {
                this.navigationService.loadBarFinish()
                this.navigationService.showMessage(error.error.message)
            }
        })
    }

}

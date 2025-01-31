import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartOptions, ChartType, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { NavigationService } from '../../navigation/navigation.service';
import { ReportsService } from '../reports.service';
Chart.register(...registerables);

@Component({
    selector: 'app-singup',
    templateUrl: './singup.component.html',
    styleUrls: ['./singup.component.sass'],
    standalone: false
})
export class SingupComponent {

    constructor(
        private readonly reportsService: ReportsService,
        private readonly navigationService: NavigationService,
    ) { }

    @ViewChild('singupChart')
    private singupChart!: ElementRef<HTMLCanvasElement>

    chartSingup: Chart | null = null
    years: number[] = []
    year: number = new Date().getFullYear()
    selectedIndex: number = 0

    ngOnInit(): void {
        this.navigationService.setTitle('Reportes')

        const startYear = 2020
        const currentYear = new Date().getFullYear()

        for (let index = startYear; index <= currentYear; index++) {
            this.years.push(index)
        }
    }

    ngAfterViewInit() {
        this.fetchData()
    }

    fetchData() {
        this.navigationService.loadBarStart()
        this.reportsService.getBusinessSingupByYear(this.year).subscribe(summaries => {
            this.navigationService.loadBarFinish()
            this.chartSingup?.destroy()

            const dataSet = {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                datasets: [
                    {
                        label: 'Empresas registradas',
                        data: summaries.map(e => e.count),
                        backgroundColor: '#4287f5',
                        fill: true,
                        datalabels: {
                            align: 'end',
                            anchor: 'end'
                        } as any
                    },
                ]
            }

            const configPrima = {
                type: 'line' as ChartType,
                data: dataSet,
                plugins: [ChartDataLabels],
                options: {
                    maintainAspectRatio: false,
                    plugins: {
                        datalabels: {
                            backgroundColor: function (context) {
                                return 'rgba(73, 79, 87, 0.5)'
                            },
                            borderRadius: 4,
                            color: 'white',
                            font: {
                                weight: 'bold'
                            },
                            padding: 5
                        }
                    }
                } as ChartOptions,
            }
            const canvasSingup = this.singupChart.nativeElement
            this.chartSingup = new Chart(canvasSingup, configPrima)
        }, (error: HttpErrorResponse) => {
            this.navigationService.loadBarFinish()
            this.navigationService.showMessage(error.error.message)
        })
    }

}

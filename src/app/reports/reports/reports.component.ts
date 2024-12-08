import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NavigationService } from 'src/app/navigation/navigation.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.sass']
})
export class ReportsComponent implements OnInit {

  constructor(
    private readonly navigationService: NavigationService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  public selectedIndex: number = 0;

  ngOnInit(): void {
    this.navigationService.setTitle('Reportes');

    this.route.queryParams.subscribe(params => {
      const { tabIndex } = params;
      this.selectedIndex = tabIndex;
    });
  }

  onChangeSelected(tabIndex: number) {

    const queryParams: Params = { tabIndex };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams, 
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
  }

}

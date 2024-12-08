import { Component, OnInit } from '@angular/core';
import { BusinessModel } from 'src/app/businesses/business.model';
import { BusinessesService } from 'src/app/businesses/businesses.service';
import { NavigationService } from 'src/app/navigation/navigation.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {

  constructor(
    private readonly businessesService: BusinessesService,
    private readonly navigationService: NavigationService,
  ) { }

  public businesses: BusinessModel[] = [];

  ngOnInit(): void {
    this.navigationService.loadBarStart();
    this.businessesService.getInfoBusinesses().subscribe(businesses => {
      this.navigationService.loadBarFinish();
      this.businesses = businesses;
    });
  }
}

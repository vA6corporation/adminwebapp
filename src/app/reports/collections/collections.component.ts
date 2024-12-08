import { Component, OnInit } from '@angular/core';
import { BusinessesService } from 'src/app/businesses/businesses.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.sass']
})
export class CollectionsComponent implements OnInit {

  constructor(
    private readonly businessesService: BusinessesService,
  ) { }

  charge: number = 0;
  chargeString: string = '';
  businessCount: number = 0;
  businessCount01: number = 0;
  businessCount10: number = 0;
  businessCount20: number = 0;

  ngOnInit(): void {
    this.businessesService.getActiveBusinesses().subscribe(businesses => {
      this.businessCount = 0;
      this.charge = 0;
      
      this.businessCount = businesses.length;

      for (const business of businesses) {
        this.charge += business.charge;
        if (business.paymentGroup === '01') {
          this.businessCount01 += 1;
        }
        if (business.paymentGroup === '10') {
          this.businessCount10 += 1;
        }
        if (business.paymentGroup === '20') {
          this.businessCount20 += 1;
        }
      }

      this.chargeString = this.charge.toLocaleString('en-US', { minimumFractionDigits: 2 });

    });
  }

}

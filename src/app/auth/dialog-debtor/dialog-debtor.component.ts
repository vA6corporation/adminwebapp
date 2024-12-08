import { Component, OnInit } from '@angular/core';
import { BusinessModel } from 'src/app/businesses/business.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dialog-debtor',
  templateUrl: './dialog-debtor.component.html',
  styleUrls: ['./dialog-debtor.component.sass']
})
export class DialogDebtorComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
  ) { }

  business: BusinessModel = this.authService.getBusiness();

  ngOnInit(): void {
  }

}

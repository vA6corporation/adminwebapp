import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { BusinessModel } from '../../businesses/business.model';
import { MaterialModule } from '../../material.module';

@Component({
    selector: 'app-dialog-debtor',
    imports: [MaterialModule],
    templateUrl: './dialog-debtor.component.html',
    styleUrls: ['./dialog-debtor.component.sass'],
})
export class DialogDebtorComponent {

    constructor(
        private readonly authService: AuthService,
    ) { }

    business: BusinessModel = this.authService.getBusiness();

}

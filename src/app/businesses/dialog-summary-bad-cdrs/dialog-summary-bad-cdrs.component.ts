import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-dialog-summary-bad-cdrs',
    imports: [MaterialModule, CommonModule],
    templateUrl: './dialog-summary-bad-cdrs.component.html',
    styleUrls: ['./dialog-summary-bad-cdrs.component.sass'],
})
export class DialogSummaryBadCdrsComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA)
        readonly summaryBadCdrs: any[],
    ) { }

}

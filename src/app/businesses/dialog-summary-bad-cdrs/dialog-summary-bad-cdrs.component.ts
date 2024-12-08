import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-summary-bad-cdrs',
  templateUrl: './dialog-summary-bad-cdrs.component.html',
  styleUrls: ['./dialog-summary-bad-cdrs.component.sass']
})
export class DialogSummaryBadCdrsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    readonly summaryBadCdrs: any[],
  ) { }

  ngOnInit(): void {

  }

}

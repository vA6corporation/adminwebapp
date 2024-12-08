import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSummaryBadCdrsComponent } from './dialog-summary-bad-cdrs.component';

describe('DialogSummaryBadCdrsComponent', () => {
  let component: DialogSummaryBadCdrsComponent;
  let fixture: ComponentFixture<DialogSummaryBadCdrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSummaryBadCdrsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSummaryBadCdrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

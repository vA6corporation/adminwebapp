import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDebtorComponent } from './dialog-debtor.component';

describe('DialogDebtorComponent', () => {
  let component: DialogDebtorComponent;
  let fixture: ComponentFixture<DialogDebtorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDebtorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDebtorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

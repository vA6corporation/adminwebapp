import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddBusinessesComponent } from './dialog-add-businesses.component';

describe('DialogAddBusinessesComponent', () => {
  let component: DialogAddBusinessesComponent;
  let fixture: ComponentFixture<DialogAddBusinessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddBusinessesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddBusinessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBusinessesComponent } from './dialog-businesses.component';

describe('DialogBusinessesComponent', () => {
  let component: DialogBusinessesComponent;
  let fixture: ComponentFixture<DialogBusinessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBusinessesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBusinessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAmendeComponent } from './add-amende.component';

describe('AddAmendeComponent', () => {
  let component: AddAmendeComponent;
  let fixture: ComponentFixture<AddAmendeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAmendeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAmendeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

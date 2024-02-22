import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAmendeComponent } from './edit-amende.component';

describe('EditAmendeComponent', () => {
  let component: EditAmendeComponent;
  let fixture: ComponentFixture<EditAmendeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAmendeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAmendeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmendeDetailsComponent } from './amende-details.component';

describe('AmendeDetailsComponent', () => {
  let component: AmendeDetailsComponent;
  let fixture: ComponentFixture<AmendeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmendeDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmendeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

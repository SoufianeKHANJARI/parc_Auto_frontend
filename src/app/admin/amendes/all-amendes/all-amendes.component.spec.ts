import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAmendesComponent } from './all-amendes.component';

describe('AllAmendesComponent', () => {
  let component: AllAmendesComponent;
  let fixture: ComponentFixture<AllAmendesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllAmendesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllAmendesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

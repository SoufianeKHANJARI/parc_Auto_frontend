import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAmendeComponent } from './add-amende/add-amende.component';
import { EditAmendeComponent } from './edit-amende/edit-amende.component';
import { AmendeDetailsComponent } from './amende-details/amende-details.component';
import { AllAmendesComponent } from './all-amendes/all-amendes.component';
import { Page404Component } from 'src/app/authentication/page404/page404.component';

const routes: Routes = [
  {
    path: "allAmendes",
    component: AllAmendesComponent,
  },
  {
    path: "add-amende",
    component: AddAmendeComponent,
  },
  {
    path: "edit-amende",
    component: EditAmendeComponent,
  },
  {
    path: "amende-details",
    component: AmendeDetailsComponent,
  },
  { path: "**", component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmendesRoutingModule { }

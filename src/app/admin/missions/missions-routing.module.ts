import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from 'src/app/authentication/page404/page404.component';
import { AllMissionsComponent } from './all-missions/all-missions.component';

const routes: Routes = [
  {
    path: "allMissions",
    component: AllMissionsComponent,
  },
  // {
  //   path: "add-mission",
  //   component: AddmissionComponent,
  // },
  // {
  //   path: "edit-mission",
  //   component: EditmissionComponent,
  // },
  // {
  //   path: "mission-details",
  //   component: MissionDetailsComponent,
  // },
  { path: "**", component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionsRoutingModule { }

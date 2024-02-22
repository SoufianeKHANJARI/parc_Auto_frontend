import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmendesRoutingModule } from './amendes-routing.module';
import { AddAmendeComponent } from './add-amende/add-amende.component';
import { AllAmendesComponent } from './all-amendes/all-amendes.component';
import { EditAmendeComponent } from './edit-amende/edit-amende.component';
import { AmendeDetailsComponent } from './amende-details/amende-details.component';


import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSortModule } from "@angular/material/sort";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatCheckboxModule } from "@angular/material/checkbox";

import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTableExporterModule } from "mat-table-exporter";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { ComponentsModule } from "src/app/shared/components/components.module";
import { SharedModule } from "./../../shared/shared.module";
import { AmendeService } from './all-amendes/amende.service';
import { DeleteDialogComponent } from './all-amendes/dialogs/delete/delete.component';
import { FormDialogComponent } from './all-amendes/dialogs/form-dialog/form-dialog.component';


@NgModule({
  declarations: [
    AddAmendeComponent,
    AllAmendesComponent,
    DeleteDialogComponent,
    FormDialogComponent,
    EditAmendeComponent,
    AmendeDetailsComponent
  ],
  imports: [
    CommonModule,
    AmendesRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTabsModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatTableExporterModule,
    MatProgressSpinnerModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [AmendeService],
})
export class AmendesModule { }

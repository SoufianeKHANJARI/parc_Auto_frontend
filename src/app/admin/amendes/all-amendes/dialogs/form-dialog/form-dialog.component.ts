import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";


import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from "@angular/forms";

import { formatDate } from "@angular/common";
import { AmendeService } from "../../amende.service";
import { Amende } from "../../amende";
@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.sass"],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  amendesForm: UntypedFormGroup;
  amendes: Amende;
  
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public AmendeService: AmendeService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      this.dialogTitle = data.amendes.name;
      this.amendes = data.amendes;
    } else {
      this.dialogTitle = "New Amendes";
      this.amendes = new Amende({});
    }
    this.amendesForm = this.createContactForm();
  }
  formControl = new UntypedFormControl("", [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError("required")
      ? "Required field"
      : this.formControl.hasError("email")
      ? "Not a valid email"
      : "";
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      // idAmende: [this.amendes.idAmende],
      frais: [this.amendes.frais],
      motif: [this.amendes.motif],
      // IsContested: [this.amendes.IsContested],
      // IsPayed: [this.amendes.IsPayed],
      dateRecuAmende: [
        formatDate(this.amendes.dateRecuAmende, "yyyy-MM-dd", "en"),
        [Validators.required],
      ],
      DateDeFAitAmende: [
        formatDate(this.amendes.DateDeFAitAmende, "yyyy-MM-dd", "en"),
        [Validators.required],
      ],
      // DatePayement: [
      //   formatDate(this.amendes.DatePayement, "yyyy-MM-dd", "en"),
      //   [Validators.required],
      // ],
      // id_mission: [this.amendes.id_mission],
      // id_parc: [this.amendes.id_parc],
      // 
      // emplacement: [this.amendes.emplacement],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.AmendeService.addAmendes(this.amendesForm.getRawValue());
  }
}

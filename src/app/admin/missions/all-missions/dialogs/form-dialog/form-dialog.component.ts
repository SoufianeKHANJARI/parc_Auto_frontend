import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";

import {
  UntypedFormControl, 
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from "@angular/forms";

import { formatDate } from "@angular/common";
import { Mission } from "../../mission";
import { MissionService } from "../../mission.service";
@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.sass"],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  missionsForm: UntypedFormGroup;
  missions: Mission;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public missionsService: MissionService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      this.dialogTitle = data.missions.name;
      this.missions = data.missions;
    } else {
      this.dialogTitle = "New Missions";
      this.missions = {};
    }
    this.missionsForm = this.createContactForm();
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
      idMission: [this.missions.idMission],
      description: [this.missions.description],
      status: [this.missions.status],
      start_km: [this.missions.start_km],
      dateDebut: [
        formatDate(this.missions.dateDebut, "yyyy-MM-dd", "en"),
        [Validators.required],
      ],
      created_at: [
        formatDate(this.missions.created_at, "yyyy-MM-dd", "en"),
        [Validators.required],
      ],
      dateFin: [
        formatDate(this.missions.dateFin, "yyyy-MM-dd", "en"),
        [Validators.required],
      ],
      end_km: [this.missions.end_km],
      start_state: [this.missions.start_state],
      end_state: [this.missions.end_state],
      driver_License: [this.missions.driver_License],
      is_delete: [this.missions.is_delete],
      id_car: [this.missions.id_car],
      id_parc: [this.missions.id_parc],

    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.missionsService.addmissions(this.missionsForm.getRawValue());
  }
}

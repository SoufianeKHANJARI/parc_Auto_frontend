import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { DoctorsService } from "../../doctors.service";
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from "@angular/forms";
import { Doctors } from "../../doctors.model";
import { formatDate } from "@angular/common";
@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.sass"],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  doctorsForm: UntypedFormGroup;
  doctors: Doctors;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public doctorsService: DoctorsService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      this.dialogTitle = data.doctors.name;
      this.doctors = data.doctors;
    } else {
      this.dialogTitle = "New Doctors";
      this.doctors = new Doctors({});
    }
    this.doctorsForm = this.createContactForm();
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
      id: [this.doctors.id],
      img: [this.doctors.img],
      name: [this.doctors.name],
      email: [this.doctors.mail],
      date: [
        formatDate(this.doctors.date, "yyyy-MM-dd", "en"),
        [Validators.required],
      ],
      specialization: [this.doctors.specialization],
      mobile: [this.doctors.phone],
      address: [this.doctors.address],
      degree: [this.doctors.degree],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.doctorsService.addDoctors(this.doctorsForm.getRawValue());
  }
}

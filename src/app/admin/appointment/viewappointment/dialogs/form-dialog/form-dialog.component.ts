import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { AppointmentService } from "../../appointment.service";
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from "@angular/forms";
import { Appointment } from "../../appointment.model";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { formatDate } from "@angular/common";
import { Doctors } from "src/app/admin/doctors/alldoctors/doctors.model";
import { DoctorsService } from "src/app/admin/doctors/alldoctors/doctors.service";
@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.sass"],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: "en-GB" }],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  appointmentForm: UntypedFormGroup;
  appointment: Appointment;
  doctors:any[]=[];
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public appointmentService: AppointmentService,
    private fb: UntypedFormBuilder,
    private serviceDoctor: DoctorsService
  ) {
    // Set the defaults
     this.serviceDoctor.getAllDoctors().subscribe(
        (data)=>this.doctors=data
     );
    this.action = data.action;
    if (this.action === "edit") {
      console.log(data.appointment.date);
      this.dialogTitle = data.appointment.name;
      this.appointment = data.appointment;
    } else {
      this.dialogTitle = "New Appointment";
      this.appointment = new Appointment({});
    }
    this.appointmentForm = this.createContactForm();
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
      id: [this.appointment.id],
      img: [this.appointment.img],
      name: [this.appointment.name, [Validators.required]],
      email: [
        this.appointment.email,
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      gender: [this.appointment.gender],
      date: [
        formatDate(this.appointment.date, "yyyy-MM-dd", "en"),
        [Validators.required],
      ],
      time: [this.appointment.time, [Validators.required]],
      mobile: [this.appointment.mobile, [Validators.required]],
      doctor: [this.appointment.doctorDto, [Validators.required]],
      injury: [this.appointment.injury],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  async onSelect(value : any){
    this.appointment.doctorDto=value
  }
   confirmAdd(): void {
     this.appointmentService.addAppointment(this.appointmentForm.getRawValue());
  }
}

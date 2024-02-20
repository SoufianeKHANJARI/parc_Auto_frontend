import { formatDate } from "@angular/common";
import { Doctors } from "../../doctors/alldoctors/doctors.model";
export class Appointment {
  id: number;
  img: string;
  name: string;
  email: string;
  gender: string;
  date: string;
  time: string;
  mobile: string;
  doctorDto: number;
  injury: string;
  entrepriseId: number;
  constructor(appointment) {
    {
      this.id = appointment.id || this.getRandomID();
      this.img = appointment.avatar || "assets/images/user/user1.jpg";
      this.name = appointment.name || "";
      this.email = appointment.email || "";
      this.gender = appointment.gender || "male";
      this.date = formatDate(new Date(), "yyyy-MM-dd", "en") || "";
      this.time = appointment.time || "";
      this.mobile = appointment.mobile || "";
      this.doctorDto = appointment.doctorDto || "";
      this.injury = appointment.injury || "";
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0);
    };
    return S4() + S4();
  }
}

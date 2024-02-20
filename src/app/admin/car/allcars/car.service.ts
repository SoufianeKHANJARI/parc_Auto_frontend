import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { environment } from "src/environments/environment";
import { Car } from "./car";
@Injectable()
export class CarService extends UnsubscribeOnDestroyAdapter{

// private readonly API_URL = "assets/data/Car.json";
private readonly API_URL = "http://localhost:8081/doctor";
isTblLoading = true;
dataChange: BehaviorSubject<Car[]> = new BehaviorSubject<Car[]>([]);
// Temporarily stores data from dialogs
dialogData: any;
constructor(private httpClient: HttpClient) {
  super();
}
get data(): Car[] {
  return this.dataChange.value;
}
getDialogData() {
  return this.dialogData;
}
/** CRUD METHODS */
getAllCars(): void {
  this.subs.sink = this.httpClient.get<Car[]>(this.API_URL+"/all").subscribe(
    (data) => {
      this.isTblLoading = false;
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      this.isTblLoading = false;
      console.log(error.name + " " + error.message);
    }
  );
}
addCar(Car: Car): void {
  this.dialogData = Car;
    Car.parc_id=environment.parc; // env id client clinique
   this.httpClient.post(this.API_URL, Car).subscribe(data => {
    console.log(data);
    
    this.dialogData = Car;
    },
    (err: HttpErrorResponse) => {
   // error code here
  });
}
updateCar(Car: Car): void {
  this.dialogData = Car;

   this.httpClient.put(this.API_URL +"/"+ Car.id, Car).subscribe(data => {
    this.dialogData = Car;
  },
  (err: HttpErrorResponse) => {
    // error code here
  }
);
}
deleteCar(id: number): void {
  console.log(id);

    this.httpClient.delete(this.API_URL+"/"+ id).subscribe(data => {
    console.log(id);
    },
    (err: HttpErrorResponse) => {
       // error code here
    }
  );
}
getAllCar(): Observable<Car[]> {
   return this.httpClient.get<Car[]>(this.API_URL+"/all")
}
}


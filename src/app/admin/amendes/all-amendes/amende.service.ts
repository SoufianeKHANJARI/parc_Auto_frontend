import { Injectable } from '@angular/core';
import { Amende } from './amende';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { CardModel } from '@swimlane/ngx-charts';

@Injectable({
  providedIn: 'root'
})
export class AmendeService  extends UnsubscribeOnDestroyAdapter {
  // private readonly API_URL = "assets/data/amendes.json";
  private readonly API_URL = "http://localhost:8081/amende";
  private readonly API_CAR = "http://localhost:8081/car";
  
  isTblLoading = true;
  dataChange: BehaviorSubject<Amende[]> = new BehaviorSubject<Amende[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Amende[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllAmendess(): void {
    this.subs.sink = this.httpClient.get<Amende[]>(this.API_URL).subscribe(
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
  addAmendes(amendes: Amende): void {
    this.dialogData = amendes;
      amendes.id_mission=environment.mission; // env id client clinique
     this.httpClient.post(this.API_URL, amendes).subscribe(data => {
      console.log(data);
      
      this.dialogData = amendes;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
  updateAmendes(amendes: Amende): void {
    this.dialogData = amendes;

     this.httpClient.put(this.API_URL +"/"+ amendes.idAmende, amendes).subscribe(data => {
      this.dialogData = amendes;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );
  }
  deleteAmendes(id: number): void {
    console.log(id);

      this.httpClient.delete(this.API_URL+"/"+ id).subscribe(data => {
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }
  getAllAmendes(): Observable<Amende[]> {
     return this.httpClient.get<Amende[]>(this.API_URL)
  }
  /**
   * 
   * @param id : id parc 
   * @returns Array Object of Car
   */
  // getAllCars(id:number):Observable<Car[]>{
  //   return this.httpClient.get<Car[]>(this.API_CAR)
  // }

}
 
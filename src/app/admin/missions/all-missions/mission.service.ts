import { Injectable } from '@angular/core';
import { Mission } from './mission';
import { BehaviorSubject, Observable } from 'rxjs';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MissionService  extends UnsubscribeOnDestroyAdapter {
  // private readonly API_URL = "assets/data/missions.json";
  private readonly API_URL = "http://localhost:8081/mission";
  isTblLoading = true;
  dataChange: BehaviorSubject<Mission[]> = new BehaviorSubject<Mission[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {
    super(); 
  }
  get data(): Mission[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllmissionss(): void {
    this.subs.sink = this.httpClient.get<Mission[]>(this.API_URL).subscribe(
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
  addmissions(missions: Mission): void {
    this.dialogData = missions;
      missions.id_car=environment.car; // env id client clinique
     this.httpClient.post(this.API_URL, missions).subscribe(data => {
      console.log(data);
      
      this.dialogData = missions;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
  updatemissions(missions: Mission): void {
    this.dialogData = missions;

     this.httpClient.put(this.API_URL +"/"+ missions.idMission, missions).subscribe(data => {
      this.dialogData = missions;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );
  }
  deletemissions(id: number): void {
    console.log(id);

      this.httpClient.delete(this.API_URL+"/"+ id).subscribe(data => {
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }
  getAllmissions(): Observable<Mission[]> {
     return this.httpClient.get<Mission[]>(this.API_URL)
  }
}

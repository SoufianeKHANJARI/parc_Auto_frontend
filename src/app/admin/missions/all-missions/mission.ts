import { formatDate } from "@angular/common";

export class Mission {
    "idMission" ?:  number;
    "description" ?: string;
    "dateDebut" ?: string;
   "dateFin" ?: string;
    "status" ?: string;
    "created_at" ?: string;
    "start_km"?: number;
    "end_km"?: number; 
    "start_state" ?: string;
    "end_state" ?: string;
    "driver_License" ?: string;
    "is_delete" ?: boolean;
    "id_car" ?:  number;
    "id_parc" ?:  number;
 
    constructor(missions){
        
          this.idMission= missions.idMission;
          this.description= missions.description || "";
          this.dateDebut= formatDate(new Date(), "yyyy-MM-dd", "en") || "";
          this.dateFin= formatDate(new Date(), "yyyy-MM-dd", "en") || "";
          this.status=missions.status || "";
          this.created_at= formatDate(new Date(), "yyyy-MM-dd", "en") || "";
          this.start_km=missions.start_km;
          this.end_km=missions.end_km;
          this.start_state=missions.start_state || "";
          this.end_state=missions.end_state || "";
          this.driver_License=missions.driver_License || "";
          this.is_delete=missions.is_delete;

        

    }
  
}

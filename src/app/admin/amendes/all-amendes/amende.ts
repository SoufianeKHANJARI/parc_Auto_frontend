import { formatDate } from "@angular/common";
import { number } from "echarts";

export class Amende {
    "idAmende"?: number ;
    "dateRecuAmende"?: string ;
    "frais"?: number ;
    "DateDeFAitAmende" ?:string ;
    "DatePayement"?: string ;
     "IsContested" ?:Boolean;
     "IsPayed" ?:Boolean;
    "motif" ?:string;
    "emplacement" ?:string;
    "id_mission" ?: number;
    "id_parc" ?: number;

    constructor(amende){
        {
        this.frais=amende.frais;
        this.DateDeFAitAmende=formatDate(new Date(), "yyyy-MM-dd", "en") || "";
        this.dateRecuAmende=formatDate(new Date(), "yyyy-MM-dd", "en") || "";
        this.idAmende= amende.idAmende;
        this.DatePayement= formatDate(new Date(), "yyyy-MM-dd", "en") || "";
        this.IsContested= amende.IsContested;
        this.IsPayed= amende.IsPayed;
        this.motif= amende.motif;
        this.emplacement= amende.emplacement;
        }    
    }
}


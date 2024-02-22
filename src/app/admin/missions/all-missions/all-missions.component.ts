import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataSource } from "@angular/cdk/collections";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject, fromEvent, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { FormDialogComponent } from "./dialogs/form-dialog/form-dialog.component";
import { DeleteDialogComponent } from "./dialogs/delete/delete.component";
import { SelectionModel } from "@angular/cdk/collections";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { MissionService } from "./mission.service";
import { Mission } from "./mission";

@Component({
  selector: 'app-all-missions', 
  templateUrl: './all-missions.component.html',
  styleUrls: ['./all-missions.component.sass']
})
export class AllMissionsComponent extends UnsubscribeOnDestroyAdapter
implements OnInit
{
displayedColumns = [
  "select",
  "idMission",
  "dateDebut",
  "dateFin",
  "status",
  "driver_License",

];
exampleDatabase: MissionService | null;
dataSource: ExampleDataSource | null;
selection = new SelectionModel<Mission>(true, []);
index: number;
id: number;
missions: Mission | null;
  idMission: number;
constructor(
  public httpClient: HttpClient,
  public dialog: MatDialog,
  public missionsService: MissionService,
  private snackBar: MatSnackBar
) {
  super();
}
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;
@ViewChild("filter", { static: true }) filter: ElementRef;
ngOnInit() {
  this.loadData();
}
refresh() {
  this.loadData();
}
addNew() {
  let tempDirection;
  if (localStorage.getItem("isRtl") === "true") {
    tempDirection = "rtl";
  } else {
    tempDirection = "ltr";
  }
  const dialogRef = this.dialog.open(FormDialogComponent, {
    data: {
      missions: this.missions,
      action: "add",
    },
    direction: tempDirection,
  });
  this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
    if (result === 1) {
      // After dialog is closed we're doing frontend updates
      // For add we're just pushing a new row inside DataServicex
      this.exampleDatabase.dataChange.value.unshift(
        this.missionsService.getDialogData()
      );
      this.refreshTable();
      this.showNotification(
        "snackbar-success",
        "Add Record Successfully...!!!",
        "bottom",
        "center"
      );
    }
  });
}
editCall(row) {
  this.id = row.id;
  let tempDirection;
  if (localStorage.getItem("isRtl") === "true") {
    tempDirection = "rtl";
  } else {
    tempDirection = "ltr";
  }
  const dialogRef = this.dialog.open(FormDialogComponent, {
    data: {
      missions: row,
      action: "edit",
    },
    direction: tempDirection,
  });
  this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
    if (result === 1) {
      // When using an edit things are little different, firstly we find record inside DataService by id
      const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
        (x) => x.idMission === this.idMission
      );
      // Then you update that record using data from dialogData (values you enetered)
      this.exampleDatabase.dataChange.value[foundIndex] =
        this.missionsService.getDialogData();
      // And lastly refresh table
      this.refreshTable();
      this.showNotification(
        "black",
        "Edit Record Successfully...!!!",
        "bottom",
        "center"
      );
    }
  });
}
deleteItem(row) {
  this.id = row.id;
  let tempDirection;
  if (localStorage.getItem("isRtl") === "true") {
    tempDirection = "rtl";
  } else {
    tempDirection = "ltr";
  }
  const dialogRef = this.dialog.open(DeleteDialogComponent, {
    data: row,
    direction: tempDirection,
  });
  this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
    if (result === 1) {
      const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
        (x) => x.idMission === this.idMission
      );
      // for delete we use splice in order to remove single object from DataService
      this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
      this.refreshTable();
      this.showNotification(
        "snackbar-danger",
        "Delete Record Successfully...!!!",
        "bottom",
        "center"
      );
    }
  });
}
private refreshTable() {
  this.paginator._changePageSize(this.paginator.pageSize);
}
/** Whether the number of selected elements matches the total number of rows. */
isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.renderedData.length;
  return numSelected === numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  this.isAllSelected()
    ? this.selection.clear()
    : this.dataSource.renderedData.forEach((row) =>
        this.selection.select(row)
      );
}
removeSelectedRows() {
  const totalSelect = this.selection.selected.length;
  this.selection.selected.forEach((item) => {
    const index: number = this.dataSource.renderedData.findIndex(
      (d) => d === item
    );
    // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
    this.exampleDatabase.dataChange.value.splice(index, 1);

    this.refreshTable();
    this.selection = new SelectionModel<Mission>(true, []);
  });
  this.showNotification(
    "snackbar-danger",
    totalSelect + " Record Delete Successfully...!!!",
    "bottom",
    "center"
  );
}
public loadData() {
  this.exampleDatabase = new MissionService(this.httpClient);
  this.dataSource = new ExampleDataSource(
    this.exampleDatabase,
    this.paginator,
    this.sort
  );
  this.subs.sink = fromEvent(this.filter.nativeElement, "keyup").subscribe(
    () => {
      if (!this.dataSource) {
        return;
      }
      this.dataSource.filter = this.filter.nativeElement.value;
    }
  );
}
showNotification(colorName, text, placementFrom, placementAlign) {
  this.snackBar.open(text, "", {
    duration: 2000,
    verticalPosition: placementFrom,
    horizontalPosition: placementAlign,
    panelClass: colorName,
  });
}
}
export class ExampleDataSource extends DataSource<Mission> {
filterChange = new BehaviorSubject("");
get filter(): string {
  return this.filterChange.value;
}
set filter(filter: string) {
  this.filterChange.next(filter);
}
filteredData: Mission[] = [];
renderedData: Mission[] = [];
constructor(
  public exampleDatabase: MissionService,
  public paginator: MatPaginator,
  public _sort: MatSort
) {
  super();
  // Reset to the first page when the user changes the filter.
  this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
}
/** Connect function called by the table to retrieve one stream containing the data to render. */
connect(): Observable<Mission[]> {
  // Listen for any changes in the base data, sorting, filtering, or pagination
  const displayDataChanges = [
    this.exampleDatabase.dataChange,
    this._sort.sortChange,
    this.filterChange,
    this.paginator.page,
  ];
  this.exampleDatabase.getAllmissionss();
  return merge(...displayDataChanges).pipe(
    map(() => {
      // Filter data
      this.filteredData = this.exampleDatabase.data
        .slice()
        .filter((missions: Mission) => {
          const searchStr = (
            missions.idMission +
            missions.status +
            missions.dateDebut +
            missions.driver_License +
            missions.dateFin
          ).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });
      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());
      // Grab the page's slice of the filtered sorted data.
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      this.renderedData = sortedData.splice(
        startIndex,
        this.paginator.pageSize
      );
      return this.renderedData;
    })
  );
}
disconnect() {}
/** Returns a sorted copy of the database data. */
sortData(data: Mission[]): Mission[] {
  if (!this._sort.active || this._sort.direction === "") {
    return data;
  }
  return data.sort((a, b) => {
    let propertyA: number | string = "";
    let propertyB: number | string = "";    
    switch (this._sort.active) {
      case "idMission":
        [propertyA, propertyB] = [a.idMission, b.idMission];
        break;
      case "status":
        [propertyA, propertyB] = [a.status, b.status];
        break;
      // case "created_at":
      //   [propertyA, propertyB] = [a.created_at, b.created_at];
      //   break;
      case "dateDebut":
        [propertyA, propertyB] = [a.dateDebut, b.dateDebut];
        break;
      case "driver_License":
        [propertyA, propertyB] = [a.driver_License, b.driver_License];
        break;
      case "dateFin":
        [propertyA, propertyB] = [a.dateFin, b.dateFin];
        break;
    }
    const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
    const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
    return (
      (valueA < valueB ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
    );
  });
}
}

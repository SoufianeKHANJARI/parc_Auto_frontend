import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

import { DataSource } from "@angular/cdk/collections";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject, fromEvent, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { SelectionModel } from "@angular/cdk/collections";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { CarService } from "./car.service";
import { Car } from "./car";

@Component({
  selector: 'app-allcars',
  templateUrl: './allcars.component.html',
  styleUrls: ['./allcars.component.sass']
})
export class AllcarsComponent
extends UnsubscribeOnDestroyAdapter
implements OnInit
{
displayedColumns = [
  "select",
  "img",
  "name",
  "department",
  "specialization",
  "degree",
  "mobile",
  "email",
  "date",
  "actions",
];
exampleDatabase: CarService | null;
dataSource: ExampleDataSource | null;
selection = new SelectionModel<Car>(true, []);
index: number;
id: number;
car: Car | null;
constructor(
  public httpClient: HttpClient,
  public dialog: MatDialog,
  public carService: CarService,
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
//   let tempDirection;
//   if (localStorage.getItem("isRtl") === "true") {
//     tempDirection = "rtl";
//   } else {
//     tempDirection = "ltr";
//   }
//   // const dialogRef = this.dialog.open(FormDialogComponent, {
//   //   data: {
//   //     car: this.car,
//   //     action: "add",
//   //   },
//   //   direction: tempDirection,
//   // });
//   this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
//     if (result === 1) {
//       // After dialog is closed we're doing frontend updates
//       // For add we're just pushing a new row inside DataServicex
//       this.exampleDatabase.dataChange.value.unshift(
//         this.carService.getDialogData()
//       );
//       this.refreshTable();
//       this.showNotification(
//         "snackbar-success",
//         "Add Record Successfully...!!!",
//         "bottom",
//         "center"
//       );
//     }
//   });
}
editCall(row) {
  // this.id = row.id;
  // let tempDirection;
  // if (localStorage.getItem("isRtl") === "true") {
  //   tempDirection = "rtl";
  // } else {
  //   tempDirection = "ltr";
  // }
  // const dialogRef = this.dialog.open(FormDialogComponent, {
  //   data: {
  //     car: row,
  //     action: "edit",
  //   },
  //   direction: tempDirection,
  // });
  // this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
  //   if (result === 1) {
  //     // When using an edit things are little different, firstly we find record inside DataService by id
  //     const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
  //       (x) => x.id === this.id
  //     );
  //     // Then you update that record using data from dialogData (values you enetered)
  //     this.exampleDatabase.dataChange.value[foundIndex] =
  //       this.carService.getDialogData();
  //     // And lastly refresh table
  //     this.refreshTable();
  //     this.showNotification(
  //       "black",
  //       "Edit Record Successfully...!!!",
  //       "bottom",
  //       "center"
  //     );
  //   }
  // });
}
deleteItem(row) {
  // this.id = row.id;
  // let tempDirection;
  // if (localStorage.getItem("isRtl") === "true") {
  //   tempDirection = "rtl";
  // } else {
  //   tempDirection = "ltr";
  // }
  // const dialogRef = this.dialog.open(DeleteDialogComponent, {
  //   data: row,
  //   direction: tempDirection,
  // });
  // this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
  //   if (result === 1) {
  //     const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
  //       (x) => x.id === this.id
  //     );
  //     // for delete we use splice in order to remove single object from DataService
  //     this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
  //     this.refreshTable();
  //     this.showNotification(
  //       "snackbar-danger",
  //       "Delete Record Successfully...!!!",
  //       "bottom",
  //       "center"
  //     );
  //   }
  // });
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
    this.selection = new SelectionModel<Car>(true, []);
  });
  this.showNotification(
    "snackbar-danger",
    totalSelect + " Record Delete Successfully...!!!",
    "bottom",
    "center"
  );
}
public loadData() {
  this.exampleDatabase = new CarService(this.httpClient);
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
export class ExampleDataSource extends DataSource<Car> {
filterChange = new BehaviorSubject("");
get filter(): string {
  return this.filterChange.value;
}
set filter(filter: string) {
  this.filterChange.next(filter);
}
filteredData: Car[] = [];
renderedData: Car[] = [];
constructor(
  public exampleDatabase: CarService,
  public paginator: MatPaginator,
  public _sort: MatSort
) {
  super();
  // Reset to the first page when the user changes the filter.
  this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
}
/** Connect function called by the table to retrieve one stream containing the data to render. */
connect(): Observable<Car[]> {
  // Listen for any changes in the base data, sorting, filtering, or pagination
  const displayDataChanges = [
    this.exampleDatabase.dataChange,
    this._sort.sortChange,
    this.filterChange,
    this.paginator.page,
  ];
  this.exampleDatabase.getAllCars();
  return merge(...displayDataChanges).pipe(
    map(() => {
      // Filter data
      this.filteredData = this.exampleDatabase.data
        .slice()
        .filter((car: Car) => {
          const searchStr = (
            car.mat +
            car.brand +
            car.model +
            car.fuel +
            car.power +
            car.nbrPlace
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
sortData(data: Car[]): Car[] {
  if (!this._sort.active || this._sort.direction === "") {
    return data;
  }
  return data.sort((a, b) => {
    let propertyA: number | string = "";
    let propertyB: number | string = "";
    switch (this._sort.active) {
      case "id":
        [propertyA, propertyB] = [a.id, b.id];
        break;
      case "name":
        [propertyA, propertyB] = [a.brand, b.brand];
        break;
      case "email":
        [propertyA, propertyB] = [a.model, b.model];
        break;
      case "date":
        [propertyA, propertyB] = [a.nbrPlace, b.nbrPlace];
        break;
      case "time":
        [propertyA, propertyB] = [a.power, b.power];
        break;
      case "mobile":
        [propertyA, propertyB] = [a.fuel, b.fuel];
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

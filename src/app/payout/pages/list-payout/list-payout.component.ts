import { SelectionModel } from "@angular/cdk/collections";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSelectChange } from "@angular/material/select";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ReplaySubject, Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { TableColumn } from "src/@vex/interfaces/table-column.interface";
import { CouponService } from "src/app/coupon-management/services/coupon.service";
import { environment } from "src/environments/environment";
import { aioTableLabels } from "src/static-data/aio-table-data";
import icEdit from "@iconify/icons-ic/twotone-edit";
import icDelete from "@iconify/icons-ic/twotone-delete";
import icSearch from "@iconify/icons-ic/twotone-search";
import icAdd from "@iconify/icons-ic/twotone-add";
import icFilterList from "@iconify/icons-ic/twotone-filter-list";
import icMoreHoriz from "@iconify/icons-ic/twotone-more-horiz";
import icFolder from "@iconify/icons-ic/twotone-folder";
import icPhone from "@iconify/icons-ic/twotone-phone";
import icMail from "@iconify/icons-ic/twotone-mail";
import icMap from "@iconify/icons-ic/twotone-map";
import { PayoutService } from "../../services/payout.service";
import { MatDialog } from "@angular/material/dialog";
import { CreatePayoutComponent } from "../../components/create-payout/create-payout.component";
import { VendorService } from "src/app/shared/services/vendor.service";
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from "@angular/material/form-field";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
@UntilDestroy()
@Component({
  selector: "vex-list-payout",
  templateUrl: "./list-payout.component.html",
  styleUrls: ["./list-payout.component.scss"],
  animations: [fadeInUp400ms, stagger40ms],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: "standard",
      } as MatFormFieldDefaultOptions,
    },
  ],
})
export class ListPayoutComponent implements OnInit {
  server = environment.baseUrl;
  layoutCtrl = new FormControl("boxed");
  menuOpen = false;
  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<any> = new ReplaySubject<any>(1);
  data$: Observable<any[]> = this.subject$.asObservable();
  anys: any[];

  @Input()
  columns: TableColumn<any>[] = [
    {
      label: "معرف الدفع ",
      property: "id",
      type: "text",
      visible: true,
      cssClasses: ["font-medium"],
    },
    {
      label: "المبلغ ",
      property: "amount",
      type: "text",
      visible: true,
      cssClasses: ["font-medium"],
    },
    { label: "تاريخ", property: "createdAt", type: "text", visible: true },
    { label: "حالة", property: "status", type: "text", visible: true },
  ];
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<any> | null;
  selection = new SelectionModel<any>(true, []);
  searchCtrl = new FormControl();

  labels = aioTableLabels;

  icPhone = icPhone;
  icMail = icMail;
  icMap = icMap;
  icEdit = icEdit;
  icSearch = icSearch;
  icDelete = icDelete;
  icAdd = icAdd;
  icFilterList = icFilterList;
  icMoreHoriz = icMoreHoriz;
  icFolder = icFolder;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  vendor: any;

  constructor(
    private payoutService: PayoutService,
    public dialog: MatDialog,
    private vendorService: VendorService
  ) {}

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getData() {
    return this.payoutService.getPayouts();
  }

  getVendorInfo() {
    this.vendorService.getMyDetails().subscribe((res) => (this.vendor = res));
  }

  ngOnInit() {
    this.getVendorInfo();
    this.getData().subscribe((anys: any) => {
      anys.forEach((cus) => {});
      this.subject$.next(anys);
    });

    this.data$.pipe(filter<any[]>(Boolean)).subscribe((anys) => {
      this.anys = anys;
      this.dataSource = new MatTableDataSource(this.anys);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.searchCtrl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value) => this.onFilterChange(value));
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  openDialog() {
    const dialogRef = this.dialog.open(CreatePayoutComponent);
    dialogRef.afterClosed().subscribe(() => {
      console.log("The dialog was closed");
      this.ngOnInit();
      this.getVendorInfo();
    });
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  onLabelChange(change: MatSelectChange, row: any) {
    const index = this.anys.findIndex((c) => c === row);
    this.anys[index].labels = change.value;
    this.subject$.next(this.anys);
  }
}

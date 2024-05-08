import { Component, Inject, Input, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ProductServiceService } from "../../../inventory-management/services/product-service.service";
import { TableColumn } from "../../../../@vex/interfaces/table-column.interface";
import { Customer } from "../../../pages/apps/aio-table/interfaces/customer.model";
import { MatTableDataSource } from "@angular/material/table";

import { SelectionModel } from "@angular/cdk/collections";
import { ProductDealsRetreive } from "../../Models/ProductDealsRetreive";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { filter } from "rxjs/operators";
import { aioTableLabels } from "../../../../static-data/aio-table-data";
import { FormGroup } from "@angular/forms";
import { Observable, ReplaySubject } from "rxjs";
import { MatSelectChange } from "@angular/material/select";
import { Deal } from "../../Models/deal";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { environment } from "src/environments/environment";

@Component({
  selector: "vex-view-products-from-list-deals",
  templateUrl: "./view-products-from-list-deals.component.html",
  styleUrls: ["./view-products-from-list-deals.component.scss"],
})
export class ViewProductsFromListDealsComponent implements OnInit {
  labels = aioTableLabels;
  isLoading = false;
  totalRows = 0;
  currentPage = 0;
  product: any;
  createdAt: Date;
  dealPrice: number;
  dealQuantity: number;
  id: string;
  updatedAt: Date;
  subject$: ReplaySubject<any> = new ReplaySubject<any>(1);
  data$: Observable<any[]> = this.subject$.asObservable();
  products: ProductDealsRetreive[];
  server: string;
  @Input()
  columns: TableColumn<Customer>[] = [
    {
        label: "صورة المنتج",
        property: "image",
        type: "image",
        visible: true,
        cssClasses: ["text-secondary"],
      },
    {
      label: "اسم المنتج",
      property: "name",
      type: "text",
      visible: true,
      cssClasses: ["text-secondary"],
    },
    {
      label: "سعر الصفقة",
      property: "dealPrice",
      type: "text",
      visible: true,
      cssClasses: ["text-secondary"],
    },
  ];
  dataSource: MatTableDataSource<ProductDealsRetreive> | null;
  selection = new SelectionModel<ProductDealsRetreive>(true, []);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ViewProductsFromListDealsComponent>,
    private productService: ProductServiceService
  ) {
    this.server = environment.baseUrl;
  }

  ngOnInit(): void {
    this.product = this.data.dealProducts;
    this.loadData();
  }

  private loadData() {
    this.products = this.getData();

    this.subject$.next(this.products);
    // load data source
    this.dataSource = new MatTableDataSource();

    this.data$
      .pipe(filter<ProductDealsRetreive[]>(Boolean))
      .subscribe((products) => {
        this.product = products;
        this.dataSource.data = products;
      });

    setTimeout(() => {
      this.dataSource.sort = this.sort;
    });
    this.isLoading = false;
  }

  getData() {
    return this.product;
  }
  onLabelChange(change: MatSelectChange, row: ProductDealsRetreive) {
    const index = this.products.findIndex((c) => c === row);
    this.products[index].id = change.value;
    this.subject$.next(this.products);
  }
  pageChanged(event: PageEvent) {
    console.log({ event });
    this.currentPage = event.pageIndex;
    this.loadData();
  }

  confirm() {
    this.dialogRef.close();
  }
  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }
}

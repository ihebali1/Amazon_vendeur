import { AfterViewInit, Input, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { environment } from "../../../../environments/environment";
import { Observable, ReplaySubject } from "rxjs";
import { Deal } from "../../Models/deal";
import { TableColumn } from "../../../../@vex/interfaces/table-column.interface";
import { Customer } from "../../../pages/apps/aio-table/interfaces/customer.model";
import { MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";
import { aioTableLabels } from "../../../../static-data/aio-table-data";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { filter } from "rxjs/operators";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { MatSelectChange } from "@angular/material/select";
import { ProductServiceService } from "../../../inventory-management/services/product-service.service";
import { fadeInUp400ms } from "../../../../@vex/animations/fade-in-up.animation";
import { stagger40ms } from "../../../../@vex/animations/stagger.animation";
import { MatStepper } from "@angular/material/stepper";
import Swal from "sweetalert2";
import { ParentProductComponent } from "../parent-product/parent-product.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { MatCheckboxChange } from "@angular/material/checkbox";

import { Component, ViewChild } from "@angular/core";
import { element } from "protractor";
import { DealsService } from "../../services/deals.service";
import { Router } from "@angular/router";

@UntilDestroy()
@Component({
  selector: "vex-deal-add",
  templateUrl: "./deal-add.component.html",
  styleUrls: ["./deal-add.component.scss"],
  animations: [fadeInUp400ms, stagger40ms],
})
export class DealAddComponent implements OnInit, AfterViewInit {
  server = environment.baseUrl;
  layoutCtrl = new FormControl("boxed");
  menuOpen = false;
  faBars = faBars;
  loading = false;

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<any> = new ReplaySubject<any>(1);
  data$: Observable<any[]> = this.subject$.asObservable();
  products: any;

  @Input()
  columns: TableColumn<Customer>[] = [
    {
      label: "Checkbox",
      property: "checkbox",
      type: "checkbox",
      visible: true,
    },

    { label: "Image", property: "image", type: "image", visible: true },
    {
      label: "اسم المنتج",
      property: "name",
      type: "text",
      visible: true,
      cssClasses: ["font-medium"],
    },
    {
      label: "الفئة",
      property: "categoryName",
      type: "text",
      visible: true,
      cssClasses: ["text-secondary", "font-medium"],
    },
    {
      label: "الثمن",
      property: "price",
      type: "text",
      visible: true,
      cssClasses: ["text-secondary"],
    },
  ];
  @Input()
  columnsResult: TableColumn<SelectedProducts>[] = [
    {
      label: "اسم المنتج",
      property: "name",
      type: "text",
      visible: true,
      cssClasses: ["text-secondary"],
    },
    {
      label: "معرف المنتج",
      property: "productId",
      type: "text",
      visible: true,
      cssClasses: ["text-secondary"],
    },
    {
      label: " السعر الحالي",
      property: "initialPrice",
      type: "text",
      visible: true,
      cssClasses: ["text-secondary"],
    },
    {
      label: "مقدار الخصم ",
      property: "price",
      type: "text",
      visible: true,
      cssClasses: ["text-secondary"],
    },
    {
      label: "ثمن الصفقة ",
      property: "dealPrice",
      type: "input",
      visible: true,
    },
  
  ];
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<any> | null;
  selection = new SelectionModel<any>(true, []);
  searchCtrl = new FormControl();

  labels = aioTableLabels;
  isLinear = false;
  schedelingDealFormGroup: FormGroup;
  confirmFormGroup: FormGroup;
  configuringDealFormGroup: FormGroup;
  chooseProductFormGroup: FormGroup;
  isChecked: any;
  isLoading = false;
  totalRows = 0;
  currentPage = 0;
  oneJan: any;
  displayedColumnsResult = ["id", "name", "productId", "productIdType"];
  dataSourceResult: MatTableDataSource<SelectedProducts>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  private selectedProducts: any;
  private currentYear: any;
  private weekNumber: any;
  numberHours: any;
  isHourly: boolean;
  isWeekly: boolean;
  displayedColumns: any;
  iamsure: boolean;
  startDate: any;
  type: any;

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private productsService: ProductServiceService,
    private dealService: DealsService,
    public dialog: MatDialog
  ) {}

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  get visibleColumnsResult() {
    return this.columnsResult
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getData(page, number) {
    return this.productsService.getProductsWithPagination(page, number);
  }

  ngAfterViewInit() {}

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
  arrayUnique(array) {
    const a = array.concat();
    for (let i = 0; i < a.length; ++i) {
      for (let j = i + 1; j < a.length; ++j) {
        if (a[i] === a[j]) {
          a.splice(j--, 1);
        }
      }
    }

    return a;
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

  onLabelChange(change: MatSelectChange, row: Deal) {
    const index = this.products.findIndex((c) => c === row);
    this.products[index].id = change.value;
    this.subject$.next(this.products);
  }

  ngOnInit() {
    this.selectedProducts = [];

    this.chooseProductFormGroup = this._formBuilder.group({
      productids: ["", Validators.required],
    });
    this.schedelingDealFormGroup = this._formBuilder.group({
      type: ["", Validators.required],
      startDate: [new Date(), Validators.required],
    });
    this.configuringDealFormGroup = this._formBuilder.group({
      dealPrice: ["", Validators.required],
      quantity: ["", Validators.required],
    });
    this.confirmFormGroup = this._formBuilder.group({
      iamsureCheckbox: ["", Validators.required],
    });
    // load data
    this.loadData();
  }

  Confirm() {
    if (this.iamsure) {
      const deal: any = {};
      deal.type = this.type;
      //deal.year = this.currentYear;
      deal.hours = this.numberHours;
      //deal.startDate = this.startDate;
      deal.productDeals = [];
      this.dataSourceResult.data.forEach((element, i) => {
        deal.productDeals.push({
          dealPrice: element.dealPrice,
          product: element.id,
        });
      });
      //deal.weekNumber = this.weekNumber;
      this.loading = true;
      this.dealService.saveDeal(deal).subscribe(
        (res) => {
          this.loading = false;
          Swal.fire({
            icon: "success",
            title: "تمت العملية بنجاح  ",
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigate(["/manage-deals/deals-list"]);
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "حدث خطأ ",
            showConfirmButton: false,
            timer: 1500,
          });
          return;
        }
      );
    } else {
      Swal.fire({
        icon: "error",
        title: "الرجاء التأكيد ",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
  }

  loadData() {
    this.getData(this.currentPage, this.pageSize).subscribe(
      (products: any) => {
        products.forEach((deal) => {
          deal.categoryName = deal.childCategory.name;
          deal.image = deal?.primaryImage?.public_url;
        });
        this.subject$.next(products);
        // load data source
        this.dataSource = new MatTableDataSource();

        this.data$.pipe(filter<Deal[]>(Boolean)).subscribe((products) => {
          this.products = products;
          this.dataSource.data = products;
        });

        setTimeout(() => {
          this.paginator.pageIndex = this.currentPage;
          this.paginator.length = products.count;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
        this.isLoading = false;
        this.searchCtrl.valueChanges
          .pipe(untilDestroyed(this))
          .subscribe((value) => this.onFilterChange(value));
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  pageChanged(event: PageEvent) {
    console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();
  }

  storeSelectedProduct(stepper: MatStepper) {
    if (this.selectedProducts.length === 0) {
      Swal.fire({
        icon: "error",
        title: "الرجاء إختيار منتج على أقل ",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    } else {
      // this.selectedProducts = this.arrayUnique( this.selectedProducts.concat(this.selection.selected));

      console.log(this.selectedProducts);

      stepper.next();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(product) {
    const dialogRef = this.dialog.open(ParentProductComponent, {
      data: {
        parent_product: product,
        selectedProducts: this.selectedProducts,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      // received data from dialog-component
      console.log(res.data);
      // update new list
      this.selectedProducts = res.selected;
      res.data.forEach((variant, i) => {
        if (
          this.selectedProducts.filter((element) =>
            variant.id.includes(element.id)
          ).length === 0
        ) {
          this.selectedProducts.push(variant);
        }
      });
    });
  }

  onChangeRow(object: MatCheckboxChange, row) {
    if (object.checked) {
      this.selectedProducts.push(row);
    } else {
      this.selectedProducts = this.selectedProducts.filter((item) => {
        return item !== row;
      });
    }
  }

  isSelected(row) {
    let res = false;
    this.selectedProducts.forEach((product, i) => {
      if (product.id === row.id) {
        res = true;
      }
    });

    return res;
  }
  getWeekNumber(date: Date) {
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
    // January 4 is always in week 1.
    const week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return (
      1 +
      Math.round(
        ((date.getTime() - week1.getTime()) / 86400000 -
          3 +
          ((week1.getDay() + 6) % 7)) /
          7
      )
    );
  }
  OnDateChange(value: any) {
    this.currentYear = value._i.year;
    this.weekNumber = this.getWeekNumber(value._d);
    this.startDate = value._i;
  }

  selectionTypePromotion(ev: any) {
    this.type = ev.value;
    if (ev.value === "LIGHTDEAL") {
      this.isHourly = true;
    } else {
      this.isWeekly = true;
      this.isHourly = false;
    }
  }

  storeSchedling(stepper: MatStepper) {
    if (this.isHourly) {
      console.log(this.numberHours);
      if (this.numberHours) {
        this.LoadProductstoConfigure();
        stepper.next();
      } else {
        Swal.fire({
          icon: "error",
          title: "الرجاء إدخل كافة المعطيات",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
    } else {
      if (this.isWeekly) {
        this.LoadProductstoConfigure();
        stepper.next();
      }
    }
  }
  LoadProductstoConfigure() {
    const sProducts: SelectedProducts[] = [];
    for (let i = 0; i < this.selectedProducts.length; i++) {
      sProducts[i] = {
        id: this.selectedProducts[i].id,
        name: this.selectedProducts[i].name,
        productId: this.selectedProducts[i].productId,
        productIdType: this.selectedProducts[i].productIdType,
        initialPrice: this.selectedProducts[i].price,
        dealPrice: 0,
      };
    }
    this.dataSourceResult = new MatTableDataSource();
    this.dataSourceResult.data = sProducts;
    setTimeout(() => {
      this.paginator.pageIndex = this.currentPage;
      this.paginator.length = this.selectedProducts.count;
      this.dataSourceResult.paginator = this.paginator;
      this.dataSourceResult.sort = this.sort;
    });
  }

  applyFilter2(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceResult.filter = filterValue.trim().toLowerCase();
  }

  storeConfiguration(stepper: MatStepper) {
    let validated = true;
    let quatitynotvalidated = false;
    let pricenotvalidated = false;
    this.dataSourceResult.data.forEach((element) => {
      if (
        element.dealPrice === 0 ||
        !Number(element.dealPrice) 
      ) {
        validated = false;
      }

      if (element.dealPrice > element.initialPrice) {
        pricenotvalidated = true;
      }
    });
    if (!validated) {
      Swal.fire({
        icon: "error",
        title: "الرجاء إدخل كافة المعطيات",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    } else if (pricenotvalidated) {
      Swal.fire({
        icon: "error",
        title: "ثمن التخفيض يجب أن لا يتجاوز  الثمن الأصلي ",
        showConfirmButton: false,
        timer: 2500,
      });
      return;
    } else if (quatitynotvalidated) {
      Swal.fire({
        icon: "error",
        title: "الكمية يجب أن لا تتجاوز الحد الأقصى ",
        showConfirmButton: false,
        timer: 2500,
      });
      return;
    } else {
      stepper.next();
    }
  }

  onChangeIamSure(ob: MatCheckboxChange) {
    this.iamsure = ob.checked;
  }
}
export interface SelectedProducts {
  id: string;
  name: string;
  productId: string;
  productIdType: string;
  initialPrice: number;
  dealPrice: number;
}

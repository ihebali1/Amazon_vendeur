import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { untilDestroyed } from '@ngneat/until-destroy';
import { ReplaySubject, Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { CustomerCreateUpdateComponent } from 'src/app/pages/apps/aio-table/customer-create-update/customer-create-update.component';
import { Customer } from 'src/app/pages/apps/aio-table/interfaces/customer.model';
import { aioTableLabels, aioTableData } from 'src/static-data/aio-table-data';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icFolder from '@iconify/icons-ic/twotone-folder';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icMail from '@iconify/icons-ic/twotone-mail';
import icMap from '@iconify/icons-ic/twotone-map';
import { ProductServiceService } from 'src/app/inventory-management/services/product-service.service';
import { environment } from "src/environments/environment";
@Component({
  selector: 'vex-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard'
      } as MatFormFieldDefaultOptions
    }
  ]
})
export class ProductListComponent implements OnInit {
  server = environment.baseUrl
  layoutCtrl = new FormControl('boxed');
  menuOpen=false;
  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<any> = new ReplaySubject<any>(1);
  data$: Observable<any[]> = this.subject$.asObservable();
  customers: any[];

  @Input()
  columns: TableColumn<Customer>[] = [

    { label: 'Image', property: 'image', type: 'image', visible: true },
    { label: 'اسم المنتج', property: 'name', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'الفئة', property: 'categoryName', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'حالة المنتج', property: 'status', type: 'text', visible: true,cssClasses:['text-secondary'] },
    { label: 'نشاط المنتج', property: 'isActive', type: 'text', visible: true,cssClasses:['text-secondary'] }
  ];
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<Customer> | null;
  selection = new SelectionModel<Customer>(true, []);
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

  constructor( private productService: ProductServiceService) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getData() {
    return this.productService.getProducts();
  }

  ngOnInit() {
    this.getData().subscribe((customers :any) => {
      customers.forEach(cus => {
        cus.categoryName = cus.childCategory.name
       cus.image = cus?.primaryImage?.public_url
      });
      this.subject$.next(customers);
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter<Customer[]>(Boolean)
    ).subscribe(customers => {
      this.customers = customers;
      this.dataSource.data = customers;
    });

    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

 /*createCustomer() {
    this.dialog.open(CustomerCreateUpdateComponent).afterClosed().subscribe((customer: Customer) => {
     
      if (customer) {
       
        this.customers.unshift(new Customer(customer));
        this.subject$.next(this.customers);
      }
    });
  }*/

 /* updateCustomer(customer: Customer) {
    this.dialog.open(CustomerCreateUpdateComponent, {
      data: customer
    }).afterClosed().subscribe(updatedCustomer => {
     
      if (updatedCustomer) {
       
        const index = this.customers.findIndex((existingCustomer) => existingCustomer.id === updatedCustomer.id);
        this.customers[index] = new Customer(updatedCustomer);
        this.subject$.next(this.customers);
      }
    });
  }*/

 /* deleteCustomer(customer: Customer) {
   
    this.customers.splice(this.customers.findIndex((existingCustomer) => existingCustomer.id === customer.id), 1);
    this.selection.deselect(customer);
    this.subject$.next(this.customers);
  }*/

  /*deleteCustomers(customers: Customer[]) {
  
    customers.forEach(c => this.deleteCustomer(c));
  }*/

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

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  onLabelChange(change: MatSelectChange, row: Customer) {
    const index = this.customers.findIndex(c => c === row);
    this.customers[index].labels = change.value;
    this.subject$.next(this.customers);
  }

}
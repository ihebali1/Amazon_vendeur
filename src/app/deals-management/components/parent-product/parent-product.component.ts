import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductServiceService} from "../../../inventory-management/services/product-service.service";
import {TableColumn} from "../../../../@vex/interfaces/table-column.interface";
import {Customer} from "../../../pages/apps/aio-table/interfaces/customer.model";
import {MatTableDataSource} from "@angular/material/table";
import {Deal} from "../../Models/deal";
import {SelectionModel} from "@angular/cdk/collections";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {aioTableLabels} from "../../../../static-data/aio-table-data";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatSelectChange} from "@angular/material/select";
import {filter} from "rxjs/operators";

import {fadeInUp400ms} from "../../../../@vex/animations/fade-in-up.animation";
import {stagger40ms} from "../../../../@vex/animations/stagger.animation";
import {Observable, ReplaySubject} from "rxjs";
import {environment} from "../../../../environments/environment";
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
    selector: 'vex-parent-product',
    templateUrl: './parent-product.component.html',
    styleUrls: ['./parent-product.component.scss'],
    animations: [
        fadeInUp400ms,
        stagger40ms
    ],
})
export class ParentProductComponent implements OnInit {


    server = environment.baseUrl;
    layoutCtrl = new FormControl('boxed');
    /**
     * Simulating a service with HTTP that returns Observables
     * You probably want to remove this and do all requests in a service with HTTP
     */
    subject$: ReplaySubject<any> = new ReplaySubject<any>(1);
    data$: Observable<any[]> = this.subject$.asObservable();
    products: any;

    @Input()
    columns: TableColumn<Customer>[] = [
        {label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true},
        {label: 'الحالة', property: 'condition',  type: 'text', visible: true, cssClasses: ['text-secondary']},
        {label: 'معرف المنتج', property: 'productId', type: 'text', visible: true, cssClasses: ['text-secondary']},
        {label: 'نوع', property: 'productIdType', type: 'text', visible: true, cssClasses: ['text-secondary']},
        {label: 'الكمية ', property: 'quantity', type: 'text', visible: true, cssClasses: ['text-secondary']},
        {label: 'الثمن', property: 'price', type: 'text', visible: true, cssClasses: ['text-secondary']}

    ];
    pageSize = 10;
    pageSizeOptions: number[] = [5, 10, 20, 50];
    dataSource: MatTableDataSource<Deal> | null;
    selection = new SelectionModel<Deal>(true, []);
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
    product: any;

    @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    private variants: any;
    private selectedProducts: any;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private dialogRef: MatDialogRef<ParentProductComponent>, private productService: ProductServiceService) {
    }

    ngOnInit(): void {
        this.product = this.data.parent_product;
        this.selectedProducts = this.data.selectedProducts;

        this.loadData();
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
    loadData() {
        this.variants = this.getData();

        this.subject$.next(this.variants);
        // load data source
        this.dataSource = new MatTableDataSource();

        this.data$.pipe(
            filter<Deal[]>(Boolean)
        ).subscribe(products => {
            this.products = products;
            this.dataSource.data = products;
        });

        setTimeout(() => {
            this.paginator.pageIndex = this.currentPage;
            this.paginator.length = this.variants.count;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
        this.isLoading = false;
    }

    get visibleColumns() {
        return this.columns.filter(column => column.visible).map(column => column.property);
    }

    /**
     * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
     * We are simulating this request here.
     */
    getData() {
        return this.product.variations;
    }

    onFilterChange(value: string) {
        if (!this.dataSource) {
            return;
        }
        value = value.trim();
        value = value.toLowerCase();
        this.dataSource.filter = value;
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

    onLabelChange(change: MatSelectChange, row: Deal) {
        const index = this.products.findIndex(c => c === row);
        this.products[index].id = change.value;
        this.subject$.next(this.products);
    }


    pageChanged(event: PageEvent) {
        console.log({event});
        this.pageSize = event.pageSize;
        this.currentPage = event.pageIndex;
        this.loadData();
    }


    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }


    onChangeRow(object: MatCheckboxChange, row : any) {
        if (object.checked){
            row.name=this.data.parent_product.name;
            this.selectedProducts.push(row);
        } else {
            this.selectedProducts = this.selectedProducts.filter((item) => {
                return item !== row;
            });
        }
    }


    cancel() {
        // closing itself and sending data to parent component
        this.dialogRef.close({data: [], selected : this.selectedProducts});
    }

    confirm() {
        // closing itself and sending data to parent component
        console.log(this.data.selectedProduct);
        this.dialogRef.close({data: this.selection.selected, selected : this.selectedProducts});
    }


}

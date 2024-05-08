import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {fadeInUp400ms} from '../../../../@vex/animations/fade-in-up.animation';
import {stagger40ms} from '../../../../@vex/animations/stagger.animation';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions} from '@angular/material/form-field';
import {environment} from '../../../../environments/environment';
import {FormControl} from '@angular/forms';
import {Observable, ReplaySubject} from 'rxjs';
import {TableColumn} from '../../../../@vex/interfaces/table-column.interface';
import {Customer} from '../../../pages/apps/aio-table/interfaces/customer.model';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {aioTableLabels} from '../../../../static-data/aio-table-data';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ProductServiceService} from '../../../inventory-management/services/product-service.service';
import {filter} from 'rxjs/operators';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {MatSelectChange} from '@angular/material/select';
import {DealsService} from '../../services/deals.service';
import {Deal} from '../../Models/deal';
import {ParentProductComponent} from "../parent-product/parent-product.component";
import {MatDialog} from "@angular/material/dialog";
import {
    ViewProductsFromListDealsComponent
} from "../view-products-from-list-deals/view-products-from-list-deals.component";

@UntilDestroy()
@Component({
    selector: 'vex-deals-list',
    templateUrl: './deals-list.component.html',
    styleUrls: ['./deals-list.component.scss'],
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
export class DealsListComponent implements OnInit, AfterViewInit {

    server = environment.baseUrl;
    layoutCtrl = new FormControl('boxed');
    menuOpen = false;
    /**
     * Simulating a service with HTTP that returns Observables
     * You probably want to remove this and do all requests in a service with HTTP
     */
    subject$: ReplaySubject<any> = new ReplaySubject<any>(1);
    data$: Observable<any[]> = this.subject$.asObservable();
    deals: Deal[];

    @Input()
    columns: TableColumn<Customer>[] = [
        {label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true},
        {label: 'تاريخ الإنشاء ', property: 'createdAt', type: 'Date', visible: true, cssClasses: ['font-medium']},
        {label: 'تاريخ البدء', property: 'startDate', type: 'Date', visible: true, cssClasses: ['text-secondary']},
        {label: 'تاريخ الإنتهاء  ', property: 'endDate', type: 'Date', visible: true, cssClasses: ['text-secondary']},
        {label: 'النشاط', property: 'isActive', type: 'text', visible: true, cssClasses: ['text-secondary']},
        {label: 'المنتوجات   ', property: 'dealProducts', type: 'button', visible: true, cssClasses: ['font-medium']},
    ];
    pageSize = 10;
    pageSizeOptions: number[] = [5, 10, 20, 50];
    dataSource: MatTableDataSource<Deal> | null;
    selection = new SelectionModel<Deal>(true, []);
    searchCtrl = new FormControl();

    labels = aioTableLabels;


    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(private dealsService: DealsService, public dialog: MatDialog) {
    }

    get visibleColumns() {
        return this.columns.filter(column => column.visible).map(column => column.property);
    }

    /**
     * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
     * We are simulating this request here.
     */
    getData(page, number) {
        return this.dealsService.getDeals(page, number);
    }

    endOffer(id: string) {
        this.dealsService.endOffer(id).subscribe(
            res => {
                this.ngOnInit();
            }
        )
    }

    ngOnInit() {
        this.getData(0, 10).subscribe((deals: any) => {
            deals.forEach(deal => {
                // deal.categoryName = deal.childCategory.name;
                // deal.image = deal?.primaryImage?.public_url;
            });
            this.subject$.next(deals);
        });

        this.dataSource = new MatTableDataSource();

        this.data$.pipe(
            filter<Deal[]>(Boolean)
        ).subscribe(deals => {
            this.deals = deals;
            this.dataSource.data = deals;
        });

        this.searchCtrl.valueChanges.pipe(
            untilDestroyed(this)
        ).subscribe(value => this.onFilterChange(value));
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }

    trackByProperty<T>(index: number, column: TableColumn<T>) {
        return column.property;
    }

    onLabelChange(change: MatSelectChange, row: Deal) {
        const index = this.deals.findIndex(c => c === row);
        this.deals[index].id = change.value;
        this.subject$.next(this.deals);
    }


    openDialogForPreview(row) {
        const dialogRef = this.dialog.open(ViewProductsFromListDealsComponent, {
            data: row
        });
    }
}

import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogDataExampleDialogComponent } from 'src/app/coupon-management/components/dialog-data-example-dialog/dialog-data-example-dialog.component';
import { ProductServiceService } from 'src/app/inventory-management/services/product-service.service';

export interface ProductElement {
  name : string;
  id: string;
 }

 
 const ELEMENT_DATA: ProductElement[] = [];
@Component({
  selector: 'vex-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  productdisplayedColumns: string[] = ['name', 'id', 'productId', 'productIdType'];
  displayedColumns: string[] = ['name', 'id', 'productId', 'productIdType'];
  selecteddisplayedColumns: string[] = ['name', 'id'];
  dataSource : MatTableDataSource<ProductElement>;
  @Output() products: EventEmitter<any> = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  pageSize = 5
  pageSizeOptions: number[] = [5, 10, 20, 50];
  selectedProducts = []
  
  constructor(private productService: ProductServiceService,public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource([]);
}
openDialog(element) {
  const dialogRef = this.dialog.open(DialogDataExampleDialogComponent,{data: {
    element: element,
    selectedProducts: this.selectedProducts
  },  disableClose: true});
  dialogRef.afterClosed().subscribe(result => {
    this.selectedProducts = result;
    console.log(this.selectedProducts) 
    this.products.emit(this.selectedProducts)
  });
}
isSelected(element) {
 
 if(this.selectedProducts.indexOf(element) == -1) return  true
 else return false
}

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    
  getData() {
    return this.productService.getProducts();
  }
  ngOnInit(): void {
    this.getData().subscribe((products:any) => {
   
      this.dataSource = new MatTableDataSource(products);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     
    });
  }
  
  addProduct(element){
    if(this.selectedProducts.indexOf(element) == -1){
   this.selectedProducts.push(element)
   this.products.emit(this.selectedProducts)
   
  }
  }
  removeProduct(p){
     this.selectedProducts = this.selectedProducts.filter(function(value, index, arr){ 
      return value != p;
  });
  this.products.emit(this.selectedProducts)
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

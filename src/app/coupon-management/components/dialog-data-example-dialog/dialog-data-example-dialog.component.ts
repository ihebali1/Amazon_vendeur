import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductServiceService } from 'src/app/inventory-management/services/product-service.service';
import { DialogData } from '../list/list.component';


export interface VariationElement {
quantity : string;
 price: string;
condition: string;
add:string;
 }
 const ELEMENT_DATA: VariationElement[] = [];
@Component({
  selector: 'vex-dialog-data-example-dialog',
  templateUrl: './dialog-data-example-dialog.component.html',
  styleUrls: ['./dialog-data-example-dialog.component.scss']
})
export class DialogDataExampleDialogComponent implements OnInit {
  selectedProducts = []
  dataSource : MatTableDataSource<any>;
  displayedColumns: string[] = ['quantity', 'price','condition','add'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageSize = 5
  pageSizeOptions: number[] = [5, 10, 20, 50];
  constructor(  public dialogRef: MatDialogRef<DialogDataExampleDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
    this.selectedProducts = this.selectedProducts.concat( data.selectedProducts);
    for (const variation of this.data.element.variations) variation.name = data.element.name
    this.dataSource= new MatTableDataSource(data.element.variations)
   
  }
 
  ngAfterViewInit() {
  }
  
ngOnInit(): void {
  console.log(this.data);
}
onNoClick(): void {
 // this.dialogRef.close();
}
addProduct(element){
  if(this.data.selectedProducts.indexOf(element) == -1){
    this.data.selectedProducts.push(element)
console.log(this.data.selectedProducts)
}}


removeProduct(element){
  this.data.selectedProducts=this.data.selectedProducts.filter(function(value,index,arr){
    return value != element;
   
  })
  console.log(this.data.selectedProducts)
}
 isSelected(variation: any) {
   if(this.data.selectedProducts.length == 0) return true
  if(this.data.selectedProducts.indexOf(variation) == -1) return  true
  else return false
 }
}


import { Component, Inject, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/inventory-management/services/product-service.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import Swal from 'sweetalert2';
import { VariationDetailsComponent } from '../variation-details/variation-details.component';
@Component({
  selector: 'vex-product-variation',
  templateUrl: './product-variation.component.html',
  styleUrls: ['./product-variation.component.scss']
})
export class ProductVariationComponent implements OnInit {
  productVariations = {};
  productId: '';
  id: '';
  variationCondition: '';
  variationPrice: '';
  variationQuantity: '';

  type: string;
  productInfo: any;

  productList = [];


  isWithVatiations: boolean = false;

  tableColumns = [
    {
      columnDef: 'productId',
      header: 'معرف المنتج',
      cell: (element: any) => `${element.id}`,
    },
    {
      columnDef: 'productIdType',
      header: 'نوع المنتج',
      cell: (element: any) => `${element.id}`,
    },

    {
      columnDef: 'variationCondition',
      header: 'الحالة',
      cell: (element: any) => `${element.variationCondition}`,
    },
    {
      columnDef: 'variationPrice',
      header: 'السعر',
      cell: (element: any) => `${element.variationPrice}`,
    },
    {
      columnDef: 'variationQuantity',
      header: 'الكمية',
      cell: (element: any) => `${element.variationQuantity}`,
    },
  ]

  displayedColumns = this.tableColumns.map(c => c.columnDef);

  constructor(private productService: ProductServiceService, private route: ActivatedRoute, public dialog: MatDialog) {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
        this.productId = params.id;
        this.type = params.type;
        console.log(this.productId); // price
      }
      );
  }



  ngOnInit() {
    this.productService.getProduct(this.productId, this.type).subscribe(
      res => {
        this.productInfo = res;
        console.log(this.productInfo);
        //   this.productVariations['condition']=this.productInfo.variationCondition;
      }
    )
  }

  openVariationDialog(variation) {
    this.dialog.open(VariationDetailsComponent, {
      data: {

        variationTheme: this.productInfo.variationTheme,
        variation: variation

      },
      width: '800px'
    });
  }


  updateVariation(variationId, variation) {
    this.productService.updateVariation(variationId, { variationCondition: variation.condition, variationPrice: variation.price, variationQuantity: variation.quantity, productId: variation.productId, productIdType: variation.productIdType }).subscribe(
      res =>
        Swal.fire({
          icon: 'success',
          title: 'تم تغيير المنتج ',
          showConfirmButton: false,
          timer: 1500
        })
    )
  }
}

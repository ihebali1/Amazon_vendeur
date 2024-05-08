import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from 'src/app/inventory-management/services/product-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'vex-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {
  vitalInfoForm = new FormGroup({
    productId: new FormControl(),
    productIdType: new FormControl(),
    name: new FormControl(),
    brand: new FormControl(),
    manufacturer: new FormControl(),
    manufactureSerial: new FormControl(),
    condition: new FormControl(),
    arName: new FormControl(),
  });
  attributeList = [];
  productId: any;
  type: string;
  productInfo: any;

  constructor(private productService: ProductServiceService, private route: ActivatedRoute) {
    this.productId = this.route.snapshot.paramMap.get('id');
    console.log(this.route.snapshot.paramMap.get('id'))
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
        this.type = params.type;
        console.log(this.type); // price
      }
      );
  }

  ngOnInit(): void {
    this.productService.getProduct(this.productId, this.type).subscribe(
      res => {
        this.productInfo = res;
        console.log(this.productInfo);
        this.vitalInfoForm = new FormGroup({
          productId: new FormControl(this.productInfo.productId),
          productIdType: new FormControl(this.productInfo.productIdType),
          name: new FormControl(this.productInfo.name),
          brand: new FormControl(this.productInfo.brand || this.productInfo.customBrand.name),
          manufacturer: new FormControl(this.productInfo.manufacturer),
          manufactureSerial: new FormControl(this.productInfo.manufactureSerial),
          arName: new FormControl(this.productInfo.arName),
          condition: new FormControl(this.productInfo?.condition),
          type: new FormControl(this.productInfo.type)

        });
      }
    )
  }
  updateVitalInfo() {
    this.productService.updateVitalInfo(this.productId, this.vitalInfoForm.getRawValue())
      .subscribe(
        res =>
          Swal.fire({
            icon: 'success',
            title: 'تم تغيير المنتج ',
            showConfirmButton: false,
            timer: 1500
          })
      )
  }

  updateProductActivation(isActive: boolean) {
    this.productService.updateProductStatus(this.productId, {
      type: this.type,
      isActive: isActive
    })
      .subscribe(
        res => {
          this.ngOnInit()
          Swal.fire({
            icon: 'success',
            title: 'تم تغيير المنتج ',
            showConfirmButton: false,
            timer: 1500
          })
        }
      )
  }






}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormGroup,FormControl} from '@angular/forms';
import { ProductServiceService } from 'src/app/inventory-management/services/product-service.service';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import Swal from 'sweetalert2';
@Component({
  selector: 'vex-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ],
})
export class ProductDescriptionComponent implements OnInit {
 

  features=[''];
  productDescription='';
  productLegal='';
  warnings=['']

  newFeature: string=''
  newWarning:string=''
  warningControl = new FormControl('')
   productId: any;
    type: string;
    productInfo: any = {
      description:'',
      features:[]
    };
    constructor(private productService: ProductServiceService,private route:ActivatedRoute) { 
    
      this.route.queryParams
        .subscribe(params => {
          console.log(params); // { orderby: "price" }
          this.productId = params.id;
          this.type = params.type;
          console.log(this.productId); // price
        }
      );
    }
  ngOnInit(): void {
    this.productService.getProduct(this.productId, this.type).subscribe(
      res => {
        this.productInfo = res;
        console.log(this.productInfo);
       
     /* this.descriptionDetails['description'] = this.productInfo.productDescription;
       this.descriptionDetails['productLegal'] = this.productInfo.productLegal;
      this.descriptionDetails['features'] = this.features;
        this.descriptionDetails['warning'] = this.warnings;*/
      }
    )
  }
  updateDescription() {
    this.productService.updateDescription(this.productId,{description:this.productInfo.description,legalDisclaimer:this.productInfo.legalDisclaimer})
    .subscribe(
      res=> 
        Swal.fire({
          icon: 'success',
          title: 'تم تغيير المنتج ',
          showConfirmButton: false,
          timer: 1500
        })
      
      )
  }
  onChange(value){
  this.newWarning=value;
  console.log(value)
}
  removeFeature(featureId: string) {
    this.productService.removeFeatureFromProduct(this.productId,featureId,this.type).

    subscribe(
      res=>{
        this.ngOnInit()
      }
    )
  }
  removeWarning(warningId: string) {
    this.productService.removeWarningFromProduct(this.productId,warningId,this.type).

    subscribe(
      res=>{
        this.ngOnInit()
      }
    )
  }

  addFeature()
  {
    this.productService.addFeatureFromProduct(this.productId,this.newFeature, this.type)
    .subscribe(
      res=>{
        this.ngOnInit()
      }
    )
  }
  addWarning()
  {
    this.productService.addWarningFromProduct(this.productId,this.warningControl.value, this.type)
    .subscribe(
      res=>{
        this.ngOnInit()
      }
    )
  }
  
}

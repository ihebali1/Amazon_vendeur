import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from 'src/app/inventory-management/services/product-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'vex-product-keywords',
  templateUrl: './product-keywords.component.html',
  styleUrls: ['./product-keywords.component.scss']
})
export class ProductKeywordsComponent implements OnInit {
  keyWords:[''];
  searchTerms:'';
  productId: any;
  type: string;
  productInfo: any;
  newKeyword:string=''
  constructor(private productService: ProductServiceService, private route:ActivatedRoute) {
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
      }
    )
  }
  updateKeywords() {
    this.productService.updateKeywords(this.productId,{searchTerms:this.productInfo.searchTerms}).subscribe
      (
        res=> 
          Swal.fire({
            icon: 'success',
            title: 'تم تغيير المنتج ',
            showConfirmButton: false,
            timer: 1500
          })
      )
  }
  addKeyword()
  {
    this.productService.addKeywordFromProduct(this.productId,this.newKeyword, this.type)
    .subscribe(
      res=>{
        this.ngOnInit()
      }
    )
  }
  removeKeyword(keywordId: string) {
    this.productService.removeKeywordFromProduct(this.productId,keywordId,this.type).

    subscribe(
      res=>{
        this.ngOnInit()
      }
    )
  }

}

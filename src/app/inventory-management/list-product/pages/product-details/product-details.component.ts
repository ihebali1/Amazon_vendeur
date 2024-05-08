import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Link } from 'src/@vex/interfaces/link.interface';
import { environment } from "src/environments/environment";
import { ProductServiceService } from 'src/app/inventory-management/services/product-service.service';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'vex-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  image: any;
  server = environment.baseUrl
  productId: any;
  type: string;
  productInfo: any;
  isWithVatiations : boolean = false;
links:Link[] = [
{
label:'معلومات المنتج',
route:'./',
routerLinkActiveOptions:{exact:true}
},

{
  label:'صور المنتج ',
  route:'./images',
  routerLinkActiveOptions:{exact:true}
},
{
  label:' وصف المنتج',
  route:'./description',
  routerLinkActiveOptions:{exact:true}
  },
  {
    label:' مواصفات المنتج',
    route:'./specifications',
    routerLinkActiveOptions:{exact:true}
    },
  {
    label:'الكلمات الدالة',
    route:'./keywords',
    routerLinkActiveOptions:{exact:true}
    },
];
attributeId:string;

  constructor(private route:ActivatedRoute,private productService: ProductServiceService) { 
  
    this.route.queryParams
    .subscribe(params => {
      console.log(params); // { orderby: "price" }
      this.productId = params.id;
      this.type = params.type;
      console.log(params.type);
      console.log(this.productId); // price
    }
  );
  }

  ngOnInit(): void {
    this.productService.getProduct(this.productId, this.type).subscribe(
      res => {
        this.productInfo = res;
        if (this.productInfo.type == 'PARENT_LISTING') {
          this.links.splice(1,0,
            {
              label:'أشكال المنتج ',
              route:'./variation',
              routerLinkActiveOptions:{exact:true},
              //iswithVariations==false
            }
          )
        } else {
          this.links.splice(1,0,
            {
              label:' سعر المنتج ',
              route:'./offer',
              routerLinkActiveOptions:{exact:true},
            
            }
          )
        }
        console.log(this.productInfo);
        
      }
    )
  }

}

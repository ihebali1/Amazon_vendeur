import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductServiceService } from "src/app/inventory-management/services/product-service.service";
import Swal from "sweetalert2";

@Component({
  selector: "vex-product-offer",
  templateUrl: "./product-offer.component.html",
  styleUrls: ["./product-offer.component.scss"],
})
export class ProductOfferComponent implements OnInit {
  price: "";
  quantity: "";
  productId: any;
  type: string;
  isWithVatiations: boolean = false;
  productInfo: any;
  constructor(
    private productService: ProductServiceService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      console.log(params); // { orderby: "price" }
      this.productId = params.id;
      this.type = params.type;
      console.log(this.productId); // price
    });
  }

  ngOnInit(): void {
    this.productService
      .getProduct(this.productId, this.type)
      .subscribe((res) => {
        this.productInfo = res;
        console.log(this.productInfo);
      });
  }
  updateOffer() {
    this.productService
      .updateOffer(this.productId, {
        price: this.productInfo.price,
        quantity: this.productInfo.quantity,
        type: this.type,
      })
      .subscribe((res) =>
        Swal.fire({
          icon: "success",
          title: "تم تغيير المنتج ",
          showConfirmButton: false,
          timer: 1500,
        })
      );
  }
}

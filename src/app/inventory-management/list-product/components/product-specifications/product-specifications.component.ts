import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductServiceService } from "src/app/inventory-management/services/product-service.service";
import Swal from "sweetalert2";

@Component({
  selector: "vex-product-specifications",
  templateUrl: "./product-specifications.component.html",
  styleUrls: ["./product-specifications.component.scss"],
})
export class ProductSpecificationsComponent implements OnInit {
  @Output() specListChanged: EventEmitter<any> = new EventEmitter();
  specifications: Specification[] = [];
  productId: any;
  type: any;
  productInfo: any;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductServiceService
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
        this.specifications = [];
        this.productInfo = res;
        this.specifications = this.productInfo.specifications;
        this.specifications.push({
          key: "",
          arKey: "",
          value: "",
        });
        console.log(this.productInfo);
      });
  }

  addSpecification(specification) {
    this.productService
      .addSpecificationToProduct(this.productId, specification, this.type)
      .subscribe((res) => {
        this.ngOnInit();
        Swal.fire({
          icon: 'success',
          title: 'اضيف بنجاح',
          text: 'سيعود منتجك إلى الحالة المعلقة ، يرجى انتظار قرار المسؤول',
          showConfirmButton: true,
          timer: 4000,
        })
        
      });
  }
  removeSpecification(specificationId) {
    this.productService
      .removeSpecificationFromProduct(
        this.productId,
        specificationId,
        this.type
      )
      .subscribe((res) => {
        this.ngOnInit();

        Swal.fire({
          icon: "success",
          title: "تمت إزالته بنجاح ",
          showConfirmButton: true,
          timer: 4000,
        });
      });
  }
}

export class Specification {
  key: string;

  arKey: string;

  value: string;
}

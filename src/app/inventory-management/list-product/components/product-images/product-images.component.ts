import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from 'src/app/inventory-management/services/product-service.service';
import { environment } from "src/environments/environment";
import { ReplaySubject, Observable, of } from 'rxjs';
import { FileService } from 'src/app/shared/services/file.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'vex-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss']
})
export class ProductImagesComponent implements OnInit {
  server = environment.baseUrl

  @Output() imagesChanged: EventEmitter<any> = new EventEmitter();
  @Output() mainImageChanged: EventEmitter<any> = new EventEmitter();
    attributeList = [];
    productId: any;
    type: string;
    productInfo: any;
    images: any[] = [];
    image: any;
    singleImage: any;
    i=0;
    added= false

   
  constructor(private productService: ProductServiceService,private route:ActivatedRoute,
    private fileService: FileService) { 
    
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
    this.getProduct()
  }

  getProduct() {
    this.productService.getProduct(this.productId, this.type).subscribe(
      res => {
        this.productInfo = res;
        console.log(this.productInfo);
        
      }
    )
  }
  onFileInput(files: FileList) {
    let reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        this.image = reader.result;
        //console.log(this.image);
        this.mainImageChanged.emit(this.image);
      }
    };
    
    reader.readAsDataURL(files[0]);
    
}

onImageInput(files: FileList) {
  console.log('heey')
  let reader = new FileReader();
  reader.onload = () => {
    if (reader.result) {
      this.singleImage = reader.result;
      
      //console.log(this.image);
      this.mainImageChanged.emit(
        this.singleImage
      );
    }
  };
  
  reader.readAsDataURL(files[0]);
  
}
onFileInputAdd(files: FileList, index) {
  let reader = new FileReader();
  reader.onload = () => {
    if (reader.result) {
      this.images[index] = reader.result;
    }
  };
  reader.readAsDataURL(files[0]);
  this.imagesChanged.emit(this.images);
}

onImageInputAdd(files: FileList, index) {
  let reader = new FileReader();
  reader.onload = () => {
    if (reader.result) {
      this.images[index] = reader.result;
    }
  };
  reader.readAsDataURL(files[0]);
  this.imagesChanged.emit(this.images);
  this.added = false
}


  updatePrimaryImage() {
    if(!this.image) return;
  this.fileService.uploadFile(this.image)
    .subscribe(
      (res: any)=>{
        this.productService.updatePrimaryImage(this.productId,res.id,this.type).subscribe( 
          res=>{this.ngOnInit()
            Swal.fire({
              icon: 'success',
              title: 'تم تغيير المنتج ',
              showConfirmButton: false,
              timer: 1500
            })
          }
       
        
        
          
        )
      }
    )
  }
  removeImage(imageId: string) {
    this.productService.removeImageFromProduct(this.productId,imageId,this.type).

    subscribe(
      res=>{
        this.ngOnInit()
      }
    )
  }
  addImage()
  {
    this.fileService.uploadFile(this.singleImage).subscribe(
      (res: any)=> {
        this.productService.addImageFromProduct(this.productId,res.id, this.type)
    .subscribe(
      res=>{
        this.getProduct()
        this.added = true
      }
    )
      }
    )
    
  }
}
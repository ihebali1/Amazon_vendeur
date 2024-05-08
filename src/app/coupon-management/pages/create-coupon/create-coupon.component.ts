import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import { CouponService } from '../../services/coupon.service';
@Component({
  selector: 'vex-create-coupon',
  templateUrl: './create-coupon.component.html',
  styleUrls: ['./create-coupon.component.scss'],
  
})
export class CreateCouponComponent implements OnInit {
  loading = false;
  isEditable : boolean = false;
  layoutCtrl = new FormControl('boxed');
  menuOpen=false;
  isLinear = true;
  firstFormGroup:   FormGroup;
  secondFormGroup:FormGroup;
  selectedProducts= [];
  productList = []
  addedList = [];
  submitted = false;
  date: Date;
  maxDate: Date;
  constructor(private formBuilder: FormBuilder,
     private route: ActivatedRoute,
    private couponService: CouponService,
    private router:Router
    ) {}
  ngOnInit() {
    this.date = new Date()
    this.maxDate = new Date()
    this.maxDate.setDate(this.date.getDate() + 89);
    this.firstFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      endDate: ['', Validators.required],
      startDate: ['', Validators.required],
      discount: ['', Validators.required, Validators.minLength(6),
      Validators.maxLength(20)],
      budget: ['', Validators.required, Validators.minLength(6),
      Validators.maxLength(20)],
      redemptionLimit: false,
      type:['', Validators.required],
     
    });
    this.secondFormGroup = this.formBuilder.group({
     secondCtrl: ['', Validators.required],
    });  
}
updateProducts(products) {
      console.log(products)
      this.selectedProducts=products;
      this.addedList = products;
      this.selectedProducts.forEach(
        (prod)=> this.productList.push(prod.id)
      )
}
get f(): { [key: string]: AbstractControl } {
  return this.firstFormGroup.controls;
}

removeProduct(p){
  this.addedList = this.addedList.filter(function(value, index, arr){ 
   return value != p;
});

this.selectedProducts=this.addedList;
  this.productList = []
      
      this.selectedProducts.forEach(
        (prod)=> this.productList.push(prod.id)
      )
}



createCoupon() {
  this.submitted = true;
  this.loading =true
  if (this.addedList.length == 0) {

    Swal.fire({
   icon: 'error',
   title: 'الرجاء إختيار منتج ',
   showConfirmButton: false,
   timer: 1500
 }).then(
   () =>   this.firstFormGroup.reset()
 )  
 return;
}
  if (this.firstFormGroup.invalid) {

       Swal.fire({
      icon: 'error',
      title: 'يرجى تعبئة النموذج ',
      showConfirmButton: false,
      timer: 1500
    })  
    return;
  }
  if(this.firstFormGroup.getRawValue().endDate<this.firstFormGroup.getRawValue().startDate){
    Swal.fire({
      icon: 'error',
      title: ' تحقق من  التاريخ  ',
      showConfirmButton: false,
      timer: 1500
    }) 
    return; 
  }
  this.couponService.addCoupons({...this.firstFormGroup.getRawValue(),
  startDate: new Date(this.firstFormGroup.getRawValue().startDate).toISOString(),
  endDate: new Date(this.firstFormGroup.getRawValue().endDate).toISOString(),
 products: this.productList.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[])}).subscribe(
    res=> {
      this.loading =false
      Swal.fire({
      icon: 'success',
      title: 'تم حفظ ',
      showConfirmButton: false,
      timer: 1500
    })
    this.router.navigate(['/manage-coupons/list']); } 
  )
 
  console.log(JSON.stringify(this.firstFormGroup.value, null, 2));
}


onReset(): void {
  this.submitted = false;
  this.firstFormGroup.reset();
}
}

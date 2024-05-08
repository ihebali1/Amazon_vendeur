import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PromotionService } from '../../services/promotion.service';

@Component({
  selector: 'vex-create-promotion',
  templateUrl: './create-promotion.component.html',
  styleUrls: ['./create-promotion.component.scss']
})
export class CreatePromotionComponent implements OnInit {
  isEditable : boolean = false;
  displayedColumns: string[] = ['كمية', 'خصم', 'إضافة'];
  layoutCtrl = new FormControl('boxed');
  menuOpen=false;
  isLinear = true;
  loading = false;
  firstFormGroup:   FormGroup;
  secondFormGroup:FormGroup;
  selectedProducts= [];
  productList = []
  addedList = [];
  appliesTo=[];
tiers=[];
  submitted = false;
  date: Date;
  maxDate: Date;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
   private promotionService: PromotionService,
   private router:Router) { }

   ngOnInit() {
    this.date = new Date()
    this.maxDate = new Date()
    this.maxDate.setDate(this.date.getDate() + 89);
    this.firstFormGroup = this.formBuilder.group({
      endDate: ['', Validators.required],
      startDate: ['', Validators.required],
      endTime:[''],
      startTime: [''],
      discount: ['', Validators.required, Validators.min(1),
      Validators.max(99)],
      minQuantity: ['', Validators.required, Validators.min(1)],
      redemptionLimit: false,
      description:  ['', Validators.required],
      type:[''],
      productTiers:[this.tiers],   
      appliesTo:[this.appliesTo],
     
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

IncreaseTiers(){
  this.tiers.push(
    {
      quantity: 0,
      discount: 0
    }
  )
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



createPromotion() {
this.submitted = true;
this.loading =true
if (this.firstFormGroup.invalid) {
  this.submitted = true;
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
   Swal.fire({
  icon: 'error',
  title: 'يرجى تعبئة النموذج ',
  showConfirmButton: false,
  timer: 1500
})  
//return;
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
//Start Date and start , end Hour 
let startHour=parseInt(this.firstFormGroup.getRawValue().startTime.split(":")[0]);
let startMinute=parseInt(this.firstFormGroup.getRawValue().startTime.split(":")[1]);
const startDate= new Date(this.firstFormGroup.getRawValue().startDate)
startDate.setHours(startHour)
startDate.setMinutes(startMinute)
const data = this.firstFormGroup.getRawValue()
delete data.startTime;


//End Date and start ,end hour
let startHourDate=parseInt(this.firstFormGroup.getRawValue().endTime.split(":")[0]);
let startMinuteDate=parseInt(this.firstFormGroup.getRawValue().endTime.split(":")[1]);
const endDate=new Date(this.firstFormGroup.getRawValue().endDate)
endDate.setHours(startHourDate)
endDate.setMinutes(startMinuteDate)
delete data.endTime

this.promotionService.addPromotions({...data,
startDate: startDate.toISOString(),
endDate: endDate.toISOString(),
appliesTo:this.appliesTo,
products: this.productList.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[])}).subscribe(
res=>{
  this.loading =false
   Swal.fire({
  icon: 'success',
  title: 'تم حفظ ',
  showConfirmButton: false,
  timer: 1500
})  
this.router.navigate(['/manage-promotion/list']); } 
)

console.log(JSON.stringify(this.firstFormGroup.value, null, 2));
}


onReset(): void {
this.submitted = false;
this.firstFormGroup.reset();
}

}

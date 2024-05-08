import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BusinessInfoService } from '../../services/business-info.service';

@Component({
  selector: 'vex-business-information',
  templateUrl: './business-information.component.html',
  styleUrls: ['./business-information.component.scss']
})
export class BusinessInformationComponent implements OnInit {
  
  imageSrc: string = "assets/img/bibl.png"
  imageSrc2: string = "assets/img/phone.png"
  imageSrc3: string = "assets/img/credit.png"
  imageSrc4: string = "assets/img/identité.png"
  businessCountry = null;
  businessType = null;
  businessName= null;
  businessinfo: FormGroup;
  countries: any;
  @Input() vendorInfo: any;
  
constructor(private businessInfoService: BusinessInfoService,
 private fb: FormBuilder, private router: Router,) { }
 @Output() businessInfoChanged: EventEmitter<any> = new EventEmitter();
 getVendorInfo() {
   this.businessInfoService.getVendorInfo().subscribe(
     res => {
       this.vendorInfo = res;
       if(this.vendorInfo.isBusinessInfoFullfilled == true)
       this.router.navigate(['/register/VerificationSteps'])
    }
   )
 }

ngOnInit() {
  this.getVendorInfo();
     this.getCountries();
      this.businessinfo = this.fb.group({
      businessName:['', Validators.maxLength(50)],
      businessType:['', Validators.maxLength(50)],
      businessCountry:['', Validators.maxLength(50)]
    });
}
getCountries = () => {
    this.businessInfoService.getCountries().subscribe(res=>{
      this.countries = res
    });
}

business_Info(){
  this.businessInfoService.updateBusinessInfo(this.businessinfo.getRawValue()).subscribe((res: any) =>{
    console.log(res);
    this.businessInfoService.savebusinessInfo(res.info);
    this.router.navigate(['/register/VerificationSteps'])
    this.businessInfoChanged.emit(true);

  })
}

}

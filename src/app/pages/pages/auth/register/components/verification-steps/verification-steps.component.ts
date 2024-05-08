import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginService } from '../../../login/services/login.service';
import { VerificationService } from '../../services/verification.service';



const THUMBUP_ICON =
  `
  <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="416.979px" height="416.979px" viewBox="0 0 416.979 416.979" style="enable-background:new 0 0 416.979 416.979;"
	 xml:space="preserve">
<g>
	<path d="M356.004,61.156c-81.37-81.47-213.377-81.551-294.848-0.182c-81.47,81.371-81.552,213.379-0.181,294.85
		c81.369,81.47,213.378,81.551,294.849,0.181C437.293,274.636,437.375,142.626,356.004,61.156z M237.6,340.786
		c0,3.217-2.607,5.822-5.822,5.822h-46.576c-3.215,0-5.822-2.605-5.822-5.822V167.885c0-3.217,2.607-5.822,5.822-5.822h46.576
		c3.215,0,5.822,2.604,5.822,5.822V340.786z M208.49,137.901c-18.618,0-33.766-15.146-33.766-33.765
		c0-18.617,15.147-33.766,33.766-33.766c18.619,0,33.766,15.148,33.766,33.766C242.256,122.755,227.107,137.901,208.49,137.901z"/>
`;

@Component({
  selector: 'vex-verification-steps',
  templateUrl: './verification-steps.component.html',
  styleUrls: ['./verification-steps.component.scss']
})

export class VerificationStepsComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  index = 1;
  value = 'Clear me';
  vendorInfo: any;

  constructor(private _formBuilder: FormBuilder ,private verificationService: VerificationService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
    private loginService: LoginService, private router: Router) {
    iconRegistry.addSvgIconLiteral('thumbs-up', sanitizer.bypassSecurityTrustHtml(THUMBUP_ICON));
   }

   updateInfo(event) {
     if(event == true) {
       this.getVendorInfo();
     }
   }

   logout() {
     this.loginService.logout()
   }

   getVendorInfo() {
    this.verificationService.getVendorInfo().subscribe(
      res => {
        
        this.vendorInfo = res;
        if (this.vendorInfo.isSellerInfoFullfilled == false) {
          this.index=0;
          return;
        } 
        else if (this.vendorInfo.isPersonalInfoFullfilled == false) {
          this.index=1;
          return;
        } 
        else if (this.vendorInfo.isBillingFullfilled == false) {
          this.index=2;
          return;
        } 
        else if (this.vendorInfo.isStoreFullfilled == false) {
          this.index=3;
          return;
        } 
        else {
          this.index=4;
          return;
        }
     }
    )
  }
 

  ngOnInit(): void {
    this.getVendorInfo();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }
  }



import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SellerInfoService } from '../../services/sellet-info.service';

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
  selector: 'vex-seller-information',
  templateUrl: './seller-information.component.html',
  styleUrls: ['./seller-information.component.scss']
})
export class SellerInformationComponent implements OnInit {
  @Output() sellerInfoChanged: EventEmitter<any> = new EventEmitter();
  sellerinfo: FormGroup;
  
  Jurisdictions:any;
  info: any;
  infoState:any;
  numberCompany=0;
  businessJurisdiction=null;
  adressLine=null;
  adressLine2=null;
  town=null;
  region=null;
  //Sellerstates=null;
  postalCode=0;
  phone=0;
  favoriteRecieve=null;
  verificationLanguage=null;
  firstName=null;
  middleName=null;
  lastName=null;
  
  constructor(private sellerInfoSerive : SellerInfoService,
    private fb: FormBuilder) {
   }
 

  ngOnInit(): void {
    this.getNameUser();
    this.getJurisdictions();
    this.sellerinfo = this.fb.group({
      numberCompany:['', Validators.maxLength(50)],
      adressLine:['', Validators.maxLength(50)],
      adressLine2:['', Validators.maxLength(50)],
      city:['', Validators.maxLength(50)],
      state:['', Validators.maxLength(50)],
     // Sellerstates:['', Validators.maxLength(50)],
      postalCode:['', Validators.maxLength(50)],
      phone:['', Validators.maxLength(50)],
      favoriteRecieve:['', Validators.maxLength(50)],
      verificationLanguage:['', Validators.maxLength(50)],
    }); 

  }

  

  getNameUser = () => {
    this.sellerInfoSerive.getNameUser().subscribe(res=>{
      this.info = res
      console.log(this.info)
    });
  }

  getSellerStates = () =>{
    this.sellerInfoSerive.getNameUser().subscribe(res=>{
      this.infoState = res
      console.log(this.infoState)
    });
  }

  getJurisdictions = () => {
    this.sellerInfoSerive.getJurisdictions().subscribe(res=>{
      this.Jurisdictions = res
    });
}

seller_Info(){
  this.sellerInfoSerive.updateSellerInfo(this.sellerinfo.getRawValue()).subscribe((res: any) =>{
    console.log(res);
    this.sellerInfoSerive.saveSellerInfo(res.info);
    this.sellerInfoChanged.emit(true);
  })
}


}
  


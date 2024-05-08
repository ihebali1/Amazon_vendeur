import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SellerInfoPersonalService } from '../../services/personal-info.service';
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
  selector: 'vex-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PersonalInformationComponent implements OnInit {
  @Output() personalInfoChanged: EventEmitter<any> = new EventEmitter();
  @Input() info: any;
  countries:any;
  countriesBirth:any;
  toppings: FormGroup;
  personalInfo: FormGroup;
  personalCity:null;
  personalCountry:null;
  personalCountryBirth:null;
  dateBirth:null;
  proofidentity:null;
  selectedValue: null;
  dateExpiry:null;
  labelPosition: 'before' | 'after' = 'after';
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return (date === 1 || date === 20) ? 'example-custom-date-class' : '';
    }

    return '';
  }
  constructor(private sellerInfoPersonalService: SellerInfoPersonalService ,
    fbp:FormBuilder,
    fb: FormBuilder,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    this.toppings = fb.group({
      pepperoni: false,
      extracheese: false,
      mushroom: false,
    });
    this.personalInfo = fbp.group({
      personalCity:['', Validators.maxLength(50)],
      personalCountry:['', Validators.maxLength(50)],
      personalCountryBirth:['', Validators.maxLength(50)],
      dateBirth:['', Validators.maxLength(50)],
      proofidentity:['', Validators.maxLength(50)],
      dateExpiry:['', Validators.maxLength(50)],

    })
    iconRegistry.addSvgIconLiteral('thumbs-up', sanitizer.bypassSecurityTrustHtml(THUMBUP_ICON));
   }

  ngOnInit(): void {
    this.getVendor();
    this.getCountries();
  }

  getCountries = () => {
    this.sellerInfoPersonalService.getCountries().subscribe(res=>{
      this.countries = res
      this.countriesBirth=res
      
    });
}

personal_Info(){
  this.sellerInfoPersonalService.updatePersonalInfo(this.personalInfo.getRawValue()).subscribe((res: any) =>{
    console.log(res);
    this.sellerInfoPersonalService.savePersonalInfo(res.info)
    this.personalInfoChanged.emit(true);
    
  })
}

getVendor = () => {
    this.sellerInfoPersonalService.getInfoUser().subscribe(res=>{
      this.info = res
      console.log(this.info)
    });
  }

}

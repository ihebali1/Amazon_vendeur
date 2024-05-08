import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Brand } from 'src/app/inventory-management/models/brand';
import { BrandService } from 'src/app/inventory-management/services/brand.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'vex-vital-info',
  templateUrl: './vital-info.component.html',
  styleUrls: ['./vital-info.component.scss']
})
export class VitalInfoComponent implements OnInit {
  @Input() childCategory: any;
  @Input() variationTheme: any;
  @Input() isWithVatiations: any;
  @Output() vitalInfoChanged: EventEmitter<any> = new EventEmitter();
  @Output() attributeValuesChanged: EventEmitter<any> = new EventEmitter();
  server: string;
  value = ' ';
  vitalInfoForm = new FormGroup({
    productId: new FormControl(),
    productIdType: new FormControl(),
    name: new FormControl(),
    brand: new FormControl(),
    customBrand: new FormControl(),
    manufacturer: new FormControl(),
    manufactureSerial: new FormControl(),
    arName: new FormControl(),
});

  attributeList = [];
  brands: Brand[];
  constructor(private brandService: BrandService) { 
    this.server = environment.baseUrl;
  }

  ngOnInit(): void {
    this.getBrands()
    this.childCategory.attributes.forEach(attribute => {
      this.attributeList.push(
        {
          attribute: attribute,
          value: ''
        }
      )
    });
    console.log(this.childCategory);
  }

  getBrands() {
    this.brandService.getBrands().subscribe(
      res => this.brands = res
    )
  }

  onInputChange(searchValue: string): void {  
    this.vitalInfoChanged.emit(this.vitalInfoForm.getRawValue());
    this.attributeValuesChanged.emit(this.attributeList);
    console.log(this.attributeList)
  }
  onChange(searchValue: string): void {  
    this.vitalInfoChanged.emit(this.vitalInfoForm.getRawValue());
    this.attributeValuesChanged.emit(this.attributeList);
  }

}

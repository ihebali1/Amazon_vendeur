import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'vex-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  @Output() descriptionChanged: EventEmitter<any> = new EventEmitter();
  descriptionDetails = {};

   features=[''];
   productDescription='';
   productLegal='';
   warnings=['']
   
  constructor() { }
  addInput(){
    this.features.push('')
  }
  removeInput(){
    this.features.pop()
  }

  addWarning(){
    this.warnings.push('')
  }
  removeWarning(){
    this.warnings.pop()
  }

  ngOnInit(): void {
  }
  onInputChange(searchValue: string): void {  
    this.descriptionDetails['description'] = this.productDescription;
    this.descriptionDetails['features'] = this.features;
    this.descriptionDetails['productLegal'] = this.productLegal;
    this.descriptionChanged.emit(this.descriptionDetails);
    
  }
  onChange(searchValue: string): void {  
    this.descriptionDetails['warning'] = this.warnings;
    this.descriptionChanged.emit(this.descriptionDetails);
 
  }

}

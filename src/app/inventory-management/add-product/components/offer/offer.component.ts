import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'vex-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {
  @Output() offerChanged: EventEmitter<any> = new EventEmitter();
  offerForm = new FormGroup({
    price: new FormControl(),
    quantity: new FormControl(),
    condition: new FormControl(),
});

  constructor() { }

  ngOnInit(): void {
  }

  onInputChange(searchValue: string): void {  
    this.offerChanged.emit(this.offerForm.getRawValue());
  }
  onChange(searchValue: string): void {  
    this.offerChanged.emit(this.offerForm.getRawValue());
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MarketPlaceService } from '../../services/market-place.service';

@Component({
  selector: 'vex-marketplaces',
  templateUrl: './marketplaces.component.html',
  styleUrls: ['./marketplaces.component.scss']
})

export class MarketplacesComponent implements OnInit {
  checkbox:FormGroup;
  checked1 = false;
  checked2 = false;
  checked3 = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  constructor(
    private marketPlaceServive : MarketPlaceService,
    private fb: FormBuilder
    ) {}

  ngOnInit(): void {
    this.checkbox = this.fb.group({
      checked1 : false,
      checked2 : false,
      checked3 : false,
    });
}
  marketPlace(){
    if (( this.checkbox.getRawValue() == true) ) {
      this.marketPlaceServive.updateMarketPlace(this.marketPlace).subscribe((res:any) =>{
        console.log(res);
        this.marketPlaceServive.saveMarketPlace(res.info);
      })
    }
  }

}

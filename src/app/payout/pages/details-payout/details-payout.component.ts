import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PayoutService } from '../../services/payout.service';

@Component({
  selector: 'vex-details-payout',
  templateUrl: './details-payout.component.html',
  styleUrls: ['./details-payout.component.scss']
})
export class DetailsPayoutComponent implements OnInit {
payoutId:any;
payout:any;
  constructor(private payoutService:PayoutService,private route:ActivatedRoute) {
    this.payoutId = this.route.snapshot.paramMap.get('id');
    console.log(this.route.snapshot.paramMap.get('id'))
    this.route.queryParams
      .subscribe(params => {
     
      }
    );
   }

  ngOnInit(): void {
    this.payoutService.getPayout(this.payoutId).subscribe(
      res => {
        this.payout = res;
        console.log(this.payout);
      
      }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CouponService } from '../../services/coupon.service';

@Component({
  selector: 'vex-details-coupon',
  templateUrl: './details-coupon.component.html',
  styleUrls: ['./details-coupon.component.scss']
})
export class DetailsCouponComponent implements OnInit {
couponId: any;
coupon:any;

  constructor(private couponsService:CouponService,private route:ActivatedRoute) { 
  
    this.couponId = this.route.snapshot.paramMap.get('id');
    console.log(this.route.snapshot.paramMap.get('id'))
    this.route.queryParams
      .subscribe(params => {
     
      }
    );
  }


  ngOnInit(): void {
  

    this.couponsService.getCoupon(this.couponId).subscribe(
      res => {
        this.coupon = res;
        console.log(this.coupon);
      
      }
    )
  }

}

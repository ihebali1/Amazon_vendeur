import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PromotionService } from '../../services/promotion.service';

@Component({
  selector: 'vex-details-promotion',
  templateUrl: './details-promotion.component.html',
  styleUrls: ['./details-promotion.component.scss']
})

export class DetailsPromotionComponent implements OnInit {
  promotionId: any;
 promotion:any;
  
    constructor(private promotionService:PromotionService,private route:ActivatedRoute) { 
    
      this.promotionId = this.route.snapshot.paramMap.get('id');
      console.log(this.route.snapshot.paramMap.get('id'))
      this.route.queryParams
        .subscribe(params => {
       
        }
      );
    }
  
  
    ngOnInit(): void {
    
  
      this.promotionService.getPromotion(this.promotionId).subscribe(
        res => {
          this.promotion = res;
          console.log(this.promotion);
        
        }
      )
    }
  
  }

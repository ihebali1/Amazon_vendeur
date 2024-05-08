import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Link } from 'src/@vex/interfaces/link.interface';

@Component({
  selector: 'vex-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  links:Link[] = [
    {
    label: 'معلومات الطلبية',
    route: './',
    routerLinkActiveOptions: {exact:true}
    },
    {
      label: ' معلومات عملية الشراء ',
      route: './customer'
    },
    {
      label:'  التوصيل',
      route: './shipping',
      routerLinkActiveOptions: {exact:true}
    },
    {
        label: 'سجل الشكاوي',
        route: './complaints',
        routerLinkActiveOptions: {exact:true}
    },
    ];
    attributeId:string;
    
      constructor(private route:ActivatedRoute,) { 
        this.attributeId=this.route.snapshot.paramMap.get('id');
      }

  ngOnInit(): void {
  }

}

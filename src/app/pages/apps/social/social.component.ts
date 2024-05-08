import { Component, OnInit } from '@angular/core';
import { Link } from '../../../../@vex/interfaces/link.interface';
import { scaleIn400ms } from '../../../../@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '../../../../@vex/animations/fade-in-right.animation';
import { SocialService } from './social.service';
import { ActivatedRoute } from '@angular/router';

export interface FriendSuggestion {
  name: string;
  imageSrc: string;
  friends: number;
  added: boolean;
}

@Component({
  selector: 'vex-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
  animations: [
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class SocialComponent implements OnInit {
connectedUser:any;
vendor:any;
  links: Link[] = [
    {
      label: '',
      route: './',
      routerLinkActiveOptions: { exact: true }
    },
  ];

  constructor(private socialService: SocialService, private route:ActivatedRoute) { 
    this.route.queryParams
    .subscribe(params => {     
    }
  );
  this.connectedUser =JSON.parse(localStorage.getItem('user_data') as string)?.id;
  console.log(this.connectedUser)
  }

  ngOnInit() {
    this.socialService.getvendorById(this.connectedUser).subscribe(
      res => {
        this.vendor= res;
    
      }
    )
  }

  translateStatus(status: string) {
    if(status == 'UNVERIFIED') return 'الحساب غير مؤكد'
    else if(status == 'VERIFIED') return 'تم التحقق من الحساب'
    else if(status == 'DISABLED') return 'الحساب معطل'
    else if(status == 'SUSPENDED') return 'حساب معلق'
    else return status;
  }
}

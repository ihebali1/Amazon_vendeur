import { Component, OnInit, ViewChild } from '@angular/core';
import icBeenhere from '@iconify/icons-ic/twotone-beenhere';
import icStars from '@iconify/icons-ic/twotone-stars';
import icBusinessCenter from '@iconify/icons-ic/twotone-business-center';
import icPhoneInTalk from '@iconify/icons-ic/twotone-phone-in-talk';
import icMail from '@iconify/icons-ic/twotone-mail';
import { stagger60ms } from '../../../../@vex/animations/stagger.animation';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { SubscriptionService } from '../auth/register/services/subscription.service';
import { StripeCardElementChangeEvent, StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { SocialService } from '../../apps/social/social.service';



@Component({
  selector: 'vex-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class PricingComponent implements OnInit {

  icBeenhere = icBeenhere;
  icStars = icStars;
  icBusinessCenter = icBusinessCenter;
  icPhoneInTalk = icPhoneInTalk;
  icMail = icMail;
  subscriptions: any;
  activeSubscription: any;
  selectedSubscription: any;
  showButton: boolean;

  stripeForm: FormGroup;

  bankForm = new FormGroup({
    bankName: new FormControl(),
    ibanNumber: new FormControl(),
    accountNumber: new FormControl(),
  });


  @ViewChild(StripeCardComponent)
  card!: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: "#666EE8",
        color: "#31325F",
        fontWeight: "300",
        padding: "5px",
        //fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: "24px",
        "::placeholder": {
          color: "#CFD7E0",
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: "en",
  };
  connectedUser: any;
  vendor: any;

  constructor(private subscriptionService: SubscriptionService, private spinner: NgxSpinnerService,
    private fb: FormBuilder, private stripeService: StripeService,
    private socialService: SocialService,) {
    this.connectedUser = JSON.parse(localStorage.getItem('user_data') as string)?.id;
  }

  ngOnInit() {
    this.getVendor();
    this.stripeForm = this.fb.group({
      name: ["", [Validators.required]],
    });

    this.getSubscriptions();
    this.getUserActiveSubscription();
  }

  getVendor() {
    this.socialService.getvendorById(this.connectedUser).subscribe(
      res => {
        this.vendor = res;
        this.bankForm = this.fb.group({
          bankName: [this.vendor.account.bankName, [Validators.required]],
          ibanNumber: [this.vendor.account.ibanNumber, [Validators.required]],
          accountNumber: [this.vendor.account.accountNumber, [Validators.required]],
        });

      })
  }

  getSubscriptions() {
    this.subscriptionService.getSubscription().subscribe(
      res => {
        this.subscriptions = res

      }
    )
  }

  subscribe() {
    this.subscriptionService.createUserSubscription({
      subscription: this.selectedSubscription?.id
    }).subscribe(
      res => {
        this.getUserActiveSubscription()
      }
    )
  }

  createToken(): void {

    Swal.fire({
      title: 'هل أنت متأكد؟',

      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#072F61',
      reverseButtons: true,
      cancelButtonColor: '#92969C',
      cancelButtonText: 'إلغاء',
      confirmButtonText: 'نعم '
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        const name = this.stripeForm?.get("name")?.value;
        this.stripeService
          .createToken(this.card.element, { name })
          .subscribe((result) => {
            if (result.token) {
              // Use the token
              this.subscriptionService.createUserSubscription({
                cardToken: result.token.id,
                subscription: this.selectedSubscription?.id
              }).subscribe(
                res => {
                  this.getUserActiveSubscription();
                  this.spinner.hide()
                },
                err => this.spinner.hide()
              )
            } else if (result.error) {
              // Error creating the token
              this.spinner.hide()

            }
          });
      }
    }, err => this.spinner.hide())


  }

  getUserActiveSubscription() {
    this.subscriptionService.getUserActiveSubscription().subscribe(
      res => { this.activeSubscription = res }
    )
  }

  selectSubscription(subscription: any) {
    if (subscription.kind == 'PROFESSIONAL') this.selectedSubscription = subscription;
    if (subscription.kind == 'INDIVIDUAL') {

      Swal.fire({
        title: 'هل أنت متأكد؟',

        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#072F61',
        reverseButtons: true,
        cancelButtonColor: '#92969C',
        cancelButtonText: 'إلغاء',
        confirmButtonText: 'نعم '
      }).then((result) => {
        if (result.isConfirmed) {
          this.selectedSubscription = subscription;
          this.subscribe();
        }
      })
    }
  }

  updateBankInfo() {

    Swal.fire({
      title: 'هل أنت متأكد؟',

      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#072F61',
      reverseButtons: true,
      cancelButtonColor: '#92969C',
      cancelButtonText: 'إلغاء',
      confirmButtonText: 'نعم '
    }).then((result) => {
      if (result.isConfirmed) {
        this.socialService.updateBankInfo(this.connectedUser, this.bankForm.getRawValue()).subscribe(
          res => {
            this.ngOnInit();
            Swal.fire({
              icon: 'success',
              title: 'تم تحديث الحساب المصرفي بنجاح',
              showConfirmButton: false,
              timer: 1500
            })
          }
        )
      }
    })

   
  }

  onChange(ev: StripeCardElementChangeEvent) {
    const displayError = document.getElementById("card-errors");
    if (ev.error) {
      this.showButton = false;
      console.log(ev.error.message);
    } else {
      this.showButton = true;
    }
  }

  cancelSubscription(userSubscriptionId: string) {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'في حال كنت قد دفعت مسبقًا مقابل الاشتراك ، فلن يتم رد أموالك',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#072F61',
      reverseButtons: true,
      cancelButtonColor: '#92969C',
      cancelButtonText: 'إلغاء',
      confirmButtonText: 'نعم '
    }).then((result) => {
      if (result.isConfirmed) {
        this.subscriptionService.cancelUserSubscription(userSubscriptionId).subscribe(
          res => {
            this.getUserActiveSubscription();
            Swal.fire({
              icon: 'success',
              title: 'تم تحديث الاشتراك للخطة الفردية',
              showConfirmButton: false,
              timer: 1500
            })
            this.selectedSubscription = null
          }
        )
      }
    })


  }

}

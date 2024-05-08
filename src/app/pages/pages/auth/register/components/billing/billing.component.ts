import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { DateAdapter } from 'angular-calendar';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { default as _rollupMoment, Moment } from 'moment';
import * as _moment from 'moment';
import { BillingService } from '../../services/billing.service';
import icBeenhere from '@iconify/icons-ic/twotone-beenhere';
import icStars from '@iconify/icons-ic/twotone-stars';
import icBusinessCenter from '@iconify/icons-ic/twotone-business-center';
import icPhoneInTalk from '@iconify/icons-ic/twotone-phone-in-talk';
import icMail from '@iconify/icons-ic/twotone-mail';
import { SubscriptionService } from '../../services/subscription.service';
import {
  StripeCardElementChangeEvent,
  StripeCardElementOptions,
  StripeElementsOptions,
} from "@stripe/stripe-js";
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import Swal from 'sweetalert2';

@Component({
  selector: 'vex-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

  ],
})
export class BillingComponent implements OnInit {
  @Output() billingInfoChanged: EventEmitter<any> = new EventEmitter();

  @Input() info: any;
  billings: null;
  billingForm: FormGroup;
  numberCreditCard = null;
  nameCard = null;
  billingAdress = 'string';
  MonthExpire = 0;
  YearExpire = 0;

  icBeenhere = icBeenhere;
  icStars = icStars;
  icBusinessCenter = icBusinessCenter;
  icPhoneInTalk = icPhoneInTalk;
  icMail = icMail;
  subscriptions: any;
  showButton: boolean;

  selectedSubscription: any;



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

  stripeTest!: FormGroup;
  stripeForm: FormGroup;
  @ViewChild(StripeCardComponent)
  card!: StripeCardComponent;
  activeSubscription: any;


  constructor(private fb: FormBuilder, private stripeService: StripeService,

    private billingService: BillingService, private subscriptionService: SubscriptionService) {
    this.billingForm = fb.group({
      bankName: ['', Validators.maxLength(50)],
      iban: ['', Validators.maxLength(50)],
      accountNumber: ['', Validators.max(12)],
    })
  }

  getUserActiveSubscription() {
    this.subscriptionService.getUserActiveSubscription().subscribe(
      res => this.activeSubscription = res
    )
  }

  createToken(): void {

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
              this.getUserActiveSubscription()
            }
          )



        } else if (result.error) {
          // Error creating the token


        }
      });
  }

  ngOnInit(): void {
    this.stripeForm = this.fb.group({
      name: ["", [Validators.required]],
    });
    this.getUserActiveSubscription();
    this.getSubscriptions();

  }
  getVendor = () => {
    this.billingService.getInfoUser().subscribe(res => {
      this.info = res
      console.log(this.info)
    });
  }

  getSubscriptions() {
    this.subscriptionService.getSubscription().subscribe(
      res => {
        this.subscriptions = res

      }
    )
  }

  cancelSubscription(id: string) {
    this.subscriptionService.cancelUserSubscription(id).subscribe(
      res => { 
        Swal.fire({
          icon: 'success',
          title: 'تم تحديث الاشتراك للخطة الفردية',
          showConfirmButton: false,
          timer: 1500
        })
        this.ngOnInit() }
    )
  }

  selectSubscription(subscription: any) {
    this.selectedSubscription = subscription
  }

  billing_Data() {
    if ((this.activeSubscription == null && this.selectedSubscription && this.selectedSubscription.kind == 'INDIVIDUAL')
    ) {
      this.subscriptionService.createUserSubscription({
        subscription: this.selectedSubscription?.id
      }).subscribe(
        res => {
          this.getUserActiveSubscription();
          this.billingService.updateBillingInfo(this.billingForm.getRawValue()).subscribe((res: any) => {
            this.billingService.savebilling(res.info)
            this.billingInfoChanged.emit(true);
          })
        }
      )
    }
    if (this.activeSubscription) this.billingService.updateBillingInfo(this.billingForm.getRawValue()).subscribe((res: any) => {
      this.billingService.savebilling(res.info)
      this.billingInfoChanged.emit(true);
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
}

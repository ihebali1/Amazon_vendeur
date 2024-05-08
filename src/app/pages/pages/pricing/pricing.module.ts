import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PricingRoutingModule } from './pricing-routing.module';
import { PricingComponent } from './pricing.component';
import { IconModule } from '@visurel/iconify-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { RegisterModule } from '../auth/register/register.module';
import { SubscriptionService } from '../auth/register/services/subscription.service';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from 'src/environments/environment';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [PricingComponent],
  imports: [
    CommonModule,
    PricingRoutingModule,
    IconModule,
    FlexLayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    NgxStripeModule.forRoot(environment.stripeApiKey),
    NgxSpinnerModule
  ],
  providers: [SubscriptionService],
})
export class PricingModule {
}

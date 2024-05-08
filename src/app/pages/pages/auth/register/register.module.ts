import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { IconModule } from '@visurel/iconify-angular';
import { BusinessInformationComponent } from './components/business-information/business-information.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SellerInformationComponent } from './components/seller-information/seller-information.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MarketplacesComponent } from './components/marketplaces/marketplaces.component';
import { MatCardModule } from '@angular/material/card';
import { BillingComponent } from './components/billing/billing.component';
import { StoreComponent } from './components/store/store.component';
import { VerificationComponent } from './components/verification/verification.component';
import { MatTableModule } from '@angular/material/table';
import { BusinessInfoService } from './services/business-info.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { VerificationStepsComponent } from './components/verification-steps/verification-steps.component';
import { SellerInfoService } from './services/sellet-info.service';
import { SellerInfoPersonalService } from './services/personal-info.service';
import { MarketPlaceService } from './services/market-place.service';
import { BillingService } from './services/billing.service';
import { StoreService } from './services/store.service';
import { UploadImageService } from './services/uploadImage.service';
import { MatTabsModule } from '@angular/material/tabs';
import { VerificationService } from './services/verification.service';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from 'src/environments/environment';
import { SubscriptionService } from './services/subscription.service';

@NgModule({
  declarations: [RegisterComponent, BusinessInformationComponent, SellerInformationComponent, PersonalInformationComponent, MarketplacesComponent, BillingComponent, StoreComponent, VerificationComponent, VerificationStepsComponent, SubscriptionComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatCheckboxModule,
    IconModule,
    MatSelectModule,
    MatDividerModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatExpansionModule,
    MatToolbarModule,
    MatStepperModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatTabsModule,
    NgxStripeModule.forRoot(environment.stripeApiKey),


  ], providers: [BusinessInfoService, SubscriptionService, SellerInfoService, SellerInfoPersonalService, MarketPlaceService, BillingService, StoreService, VerificationService, UploadImageService]

})
export class RegisterModule {
}

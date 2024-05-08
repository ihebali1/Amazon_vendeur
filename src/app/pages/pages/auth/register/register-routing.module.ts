import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { LoginGuardGuard } from '../guards/login-guard.guard';
import { BillingComponent } from './components/billing/billing.component';
import { BusinessInformationComponent } from './components/business-information/business-information.component';
import { MarketplacesComponent } from './components/marketplaces/marketplaces.component';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { SellerInformationComponent } from './components/seller-information/seller-information.component';
import { StoreComponent } from './components/store/store.component';
import { VerificationStepsComponent } from './components/verification-steps/verification-steps.component';
import { VerificationComponent } from './components/verification/verification.component';
import { RegisterComponent } from './register.component';


const routes: Routes = [
  {
    path: '',
    component: RegisterComponent
  },
  {
    path: 'business-info',
    component: BusinessInformationComponent,
    canActivate: [LoginGuardGuard],
  },
  {
    path: 'seller-info',
    component: SellerInformationComponent,
    canActivate: [LoginGuardGuard],
    
  },
  {
    path: 'personal-info',
    component: PersonalInformationComponent,
    canActivate: [LoginGuardGuard],
  },
  {
    path: 'marketplace-info',
    component: MarketplacesComponent,
    canActivate: [LoginGuardGuard],
  },
  {
    path: 'billing',
    component: BillingComponent,
    canActivate: [LoginGuardGuard],
  },
  {
    path: 'store',
    component: StoreComponent,
    canActivate: [LoginGuardGuard],
  },
  {
    path: 'verification',
    component: VerificationComponent,
    canActivate: [LoginGuardGuard],
  },
  {
    path: 'VerificationSteps',
    component: VerificationStepsComponent,
    canActivate: [LoginGuardGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule]
})
export class RegisterRoutingModule {
}

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayoutRoutingModule } from './payout-routing.module';
import { ListPayoutComponent } from './pages/list-payout/list-payout.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { CreatePayoutComponent } from './components/create-payout/create-payout.component';
import { DetailsPayoutComponent } from './pages/details-payout/details-payout.component';

@NgModule({
  declarations: [
    ListPayoutComponent,
    CreatePayoutComponent,
    DetailsPayoutComponent
  ],
  imports: [
    CommonModule,
    PayoutRoutingModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatInputModule, 
    MatPaginatorModule,
    MatButtonModule,
    MatRadioModule,
    MatMenuModule,
    BreadcrumbsModule,
    MatCheckboxModule,    
    MatIconModule,
    MatTooltipModule,
    MatSelectModule, 
    PageLayoutModule,
    FlexLayoutModule,
    MatDialogModule
  ]
  ,
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
})
export class PayoutModule { }

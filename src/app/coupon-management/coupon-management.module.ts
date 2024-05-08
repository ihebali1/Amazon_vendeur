import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CouponManagementRoutingModule } from './coupon-management-routing.module';
import { CreateCouponComponent } from './pages/create-coupon/create-coupon.component';
import { ListCouponComponent } from './pages/list-coupon/list-coupon.component';
import { DetailsCouponComponent } from './pages/details-coupon/details-coupon.component';
import {MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateComponent } from './components/create/create.component';
import { ListComponent } from './components/list/list.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IconModule } from '@visurel/iconify-angular';
import { ContainerModule } from 'src/@vex/directives/container/container.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DialogDataExampleDialogComponent } from './components/dialog-data-example-dialog/dialog-data-example-dialog.component';
@NgModule({
  declarations: [
    CreateCouponComponent,
    ListCouponComponent,
    DetailsCouponComponent,
    CreateComponent,
    ListComponent,
    DialogDataExampleDialogComponent,
  ],
  imports: [
    CommonModule,
    CouponManagementRoutingModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
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
  //  MatTabsModule,

  //  MatPaginatorModule,
  //  MatTableModule,
  //  MatSortModule,
  //  MatCheckboxModule,
  //  MatIconModule,
  //  MatButtonModule,
   // MatMenuModule,
   // IconModule,
   // FormsModule,
  //  MatTooltipModule,
   // ReactiveFormsModule,
    //MatSelectModule,
    //MatButtonToggleModule,

  //  MatInputModule,

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
})
export class CouponManagementModule { }

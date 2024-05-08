import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionManagementRoutingModule } from './promotion-management-routing.module';
import { CreatePromotionComponent } from './pages/create-promotion/create-promotion.component';
import { ListPromotionComponent } from './pages/list-promotion/list-promotion.component';
import { DetailsPromotionComponent } from './pages/details-promotion/details-promotion.component';
import { CreateComponent } from './component/create/create.component';
import { ListComponent } from './component/list/list.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import {MatTabsModule} from '@angular/material/tabs';
import { DateTimePickerComponent } from './component/date-time-picker/date-time-picker.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@NgModule({
  declarations: [ 
    CreatePromotionComponent,
    ListPromotionComponent,
    DetailsPromotionComponent,
    CreateComponent,
    ListComponent,
    DateTimePickerComponent,

  ],
  imports: [
    CommonModule,
    PromotionManagementRoutingModule,
    MatStepperModule,
    MatFormFieldModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
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
    MatDialogModule,
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

  ]
})
export class PromotionManagementModule { }

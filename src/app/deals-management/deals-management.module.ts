import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DealsManagementRoutingModule } from './deals-management-routing.module';
import { DealsListComponent } from './components/deals-list/deals-list.component';
import { DealAddComponent } from './components/deal-add/deal-add.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatStepperModule} from "@angular/material/stepper";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {IconModule} from "@visurel/iconify-angular";
import {MatIconModule} from "@angular/material/icon";
import {FlexModule} from "@angular/flex-layout";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {PageLayoutModule} from "../../@vex/components/page-layout/page-layout.module";
import {BreadcrumbsModule} from "../../@vex/components/breadcrumbs/breadcrumbs.module";
import { ParentProductComponent } from './components/parent-product/parent-product.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import { ViewProductsFromListDealsComponent } from './components/view-products-from-list-deals/view-products-from-list-deals.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    DealsListComponent,
    DealAddComponent,
      ParentProductComponent,
      ViewProductsFromListDealsComponent
  ],
    entryComponents: [ParentProductComponent, ViewProductsFromListDealsComponent],
    imports: [
        MatNativeDateModule,
        MatMomentDateModule,
        CommonModule,
        DealsManagementRoutingModule,
        MatFormFieldModule,
        MatStepperModule,
        ReactiveFormsModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatTooltipModule,
        MatOptionModule,
        MatSelectModule,
        IconModule,
        MatIconModule,
        MatProgressSpinnerModule,
        FlexModule,
        MatCheckboxModule,
        MatButtonModule,
        MatMenuModule,
        PageLayoutModule,
        BreadcrumbsModule,
        FontAwesomeModule,
        MatDialogModule,
        MatDatepickerModule,
        FormsModule,
    ]
})
export class DealsManagementModule { }

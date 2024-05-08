import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import { ListProductRoutingModule } from './list-product-routing.module';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IconModule } from '@visurel/iconify-angular';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { ContainerModule } from 'src/@vex/directives/container/container.module';
import { CustomerCreateUpdateModule } from 'src/app/pages/apps/aio-table/customer-create-update/customer-create-update.module';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { ProductImagesComponent } from './components/product-images/product-images.component';
import { ProductDescriptionComponent } from './components/product-description/product-description.component';
import { ProductKeywordsComponent } from './components/product-keywords/product-keywords.component';
import { ProductOfferComponent } from './components/product-offer/product-offer.component';
import { ProductVariationComponent } from './components/product-variation/product-variation.component';
import { ProductSpecificationsComponent } from './components/product-specifications/product-specifications.component';
import { VariationDetailsComponent } from './components/variation-details/variation-details.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    ProductInfoComponent,
    ProductImagesComponent,
    ProductDescriptionComponent,
    ProductKeywordsComponent,
    ProductOfferComponent,
    ProductVariationComponent,
    ProductSpecificationsComponent,
    VariationDetailsComponent
  ],
  imports: [
    CommonModule,
    ListProductRoutingModule,
    PageLayoutModule,
    FlexLayoutModule,
    BreadcrumbsModule,
    CustomerCreateUpdateModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    IconModule,
    FormsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    ContainerModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatInputModule,
    MatDividerModule,
 
  ]
})
export class ListProductModule { }

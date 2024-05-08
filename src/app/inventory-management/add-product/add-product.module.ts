import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddProductRoutingModule } from './add-product-routing.module';
import { ChildCategorySelectComponent } from './pages/child-category-select/child-category-select.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { VitalInfoComponent } from './components/vital-info/vital-info.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { VariationComponent } from './components/variation/variation.component';
import { MatTableModule } from '@angular/material/table';
import { OfferComponent } from './components/offer/offer.component';
import { MatDividerModule } from '@angular/material/divider';
import { ImagesComponent } from './components/images/images.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DescriptionComponent } from './components/description/description.component';
import { KeywordsComponent } from './components/keywords/keywords.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SpecificationsComponent } from './components/specifications/specifications.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import { IconModule } from '@visurel/iconify-angular';
@NgModule({
  declarations: [
    ChildCategorySelectComponent,
    AddProductComponent,
    VitalInfoComponent,
    VariationComponent,
    OfferComponent,
    ImagesComponent,
    DescriptionComponent,
    KeywordsComponent,
    SpecificationsComponent
  ],
  imports: [
    CommonModule,
    AddProductRoutingModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    ScrollingModule,
    MatListModule,
    MatTabsModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    SharedModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    MatButtonModule,
    MatChipsModule,
    IconModule
  ]
})
export class AddProductModule { }

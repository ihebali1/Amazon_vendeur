import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialProfileRoutingModule } from './social-profile-routing.module';
import { SocialProfileComponent } from './social-profile.component';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
@NgModule({
  declarations: [SocialProfileComponent],
  exports: [
    SocialProfileComponent
  ],
  imports: [
    CommonModule,
    SocialProfileRoutingModule,
    MatIconModule,
    IconModule,
    FlexLayoutModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule
  ]
})
export class SocialProfileModule {
}

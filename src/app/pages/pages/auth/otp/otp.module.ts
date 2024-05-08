import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtpRoutingModule } from './otp-routing.module';
import { OtpComponent } from './otp.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [OtpComponent, ConfirmDialogComponent],
  imports: [
    CommonModule,
    OtpRoutingModule,
    MatDialogModule,
    FormsModule,
   
  ]
})
export class OtpModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VexModule } from '../@vex/vex.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomLayoutModule } from './custom-layout/custom-layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {ConfirmBoxConfigModule, NgxAwesomePopupModule} from '@costlydeveloper/ngx-awesome-popup';
import { OtpModule } from './pages/pages/auth/otp/otp.module';
import { MatCardModule } from '@angular/material/card';
import { InterceptorService } from './pages/pages/auth/interceptors/interceptor.service';
import { AuthInterceptor } from './shared/services/authconfig.interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // Vex
    VexModule,
    CustomLayoutModule, 
    FormsModule,
    ReactiveFormsModule,
    NgxAwesomePopupModule.forRoot(),
    ConfirmBoxConfigModule.forRoot(),
    OtpModule,
    FontAwesomeModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

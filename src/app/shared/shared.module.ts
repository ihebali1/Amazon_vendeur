import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { CarouselComponent } from './components/carousel/carousel.component';


@NgModule({
  declarations: [
    CarouselComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],exports: [
    CarouselComponent
  ],
})
export class SharedModule { }

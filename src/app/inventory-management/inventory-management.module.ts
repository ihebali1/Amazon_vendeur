import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryManagementRoutingModule } from './inventory-management-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InventoryManagementRoutingModule,
    SharedModule
  ]
})
export class InventoryManagementModule { }

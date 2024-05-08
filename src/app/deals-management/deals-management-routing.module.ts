import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrderListComponent} from "../order-management/pages/order-list/order-list.component";
import {DealsListComponent} from "./components/deals-list/deals-list.component";
import {DealAddComponent} from "./components/deal-add/deal-add.component";

const routes: Routes = [

  {
    path: 'deals-list',
    component: DealsListComponent,
  },
  {
    path: 'deal-add',
    component: DealAddComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealsManagementRoutingModule {

}

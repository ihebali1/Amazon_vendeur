import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComplaintListComponent } from './components/complaint-list/complaint-list.component';
import { CustomerInfoComponent } from './components/customer-info/customer-info.component';
import { OrderInfoComponent } from './components/order-info/order-info.component';
import { ShippingInfoComponent } from './components/shipping-info/shipping-info.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { OrderListComponent } from './pages/order-list/order-list.component';

const routes: Routes = [
  {
    path:'list',
    component: OrderListComponent
  },
  {
    path: 'details/:id',
    component: OrderDetailsComponent,
    data:{
      toolbarShadowEnabled:true,
      containerEnabled:true
    },
    children:[
      { 
        path: '',
        component: OrderInfoComponent
      },
      {

         path: 'customer',
         component: CustomerInfoComponent
      },
      {
        path: 'shipping',
        component: ShippingInfoComponent
     },
    {
      path: 'complaints',
      component: ComplaintListComponent
    },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderManagementRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCouponComponent } from './pages/create-coupon/create-coupon.component';
import { DetailsCouponComponent } from './pages/details-coupon/details-coupon.component';
import { ListCouponComponent } from './pages/list-coupon/list-coupon.component';

const routes: Routes = [
  {
    path: '',
    component: CreateCouponComponent
  },
  {
    path: 'list',
    component: ListCouponComponent
  },
  {
    path: 'details/:id',
    component: DetailsCouponComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponManagementRoutingModule { }

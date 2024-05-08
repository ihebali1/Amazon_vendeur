import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsPayoutComponent } from './pages/details-payout/details-payout.component';
import { ListPayoutComponent } from './pages/list-payout/list-payout.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListPayoutComponent,
  },
  {
    path: 'details/:id',
    component: DetailsPayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayoutRoutingModule { }

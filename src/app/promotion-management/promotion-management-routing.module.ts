import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePromotionComponent } from './pages/create-promotion/create-promotion.component';
import { DetailsPromotionComponent } from './pages/details-promotion/details-promotion.component';
import { ListPromotionComponent } from './pages/list-promotion/list-promotion.component';

const routes: Routes = [
   {
  path: '',
  component: CreatePromotionComponent
},
{
  path: 'list',
  component: ListPromotionComponent
},
{
  path: 'details/:id',
  component: DetailsPromotionComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionManagementRoutingModule { }

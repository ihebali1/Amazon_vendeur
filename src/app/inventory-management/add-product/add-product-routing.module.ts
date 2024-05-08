import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { ChildCategorySelectComponent } from './pages/child-category-select/child-category-select.component';

const routes: Routes = [
  {
    path:'select-category',
    component: ChildCategorySelectComponent
  },
  {
    path:'add/:id',
    component: AddProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddProductRoutingModule { }

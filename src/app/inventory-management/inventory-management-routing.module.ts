import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'products',
    loadChildren: () => import('./add-product/add-product.module').then(m => m.AddProductModule),
  },
  {
    path:'catalog',
    loadChildren: () => import('./list-product/list-product.module').then(m => m.ListProductModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryManagementRoutingModule { }

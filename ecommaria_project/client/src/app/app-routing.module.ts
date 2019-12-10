import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CreateProductComponent } from './create-product/create-product.component'
import { ManageProductsComponent } from './manage-products/manage-products.component'


const routes: Routes = [
  // { path: 'product',component: ProductComponent },
  { path: 'product/manage',component: ManageProductsComponent, children: [
    { path: 'new',component: CreateProductComponent },
  ]
},
  // { path: 'products/:id',component: ProductShowComponent },
  // { path: 'products/:id/edit', component: ProductEditComponent },
  { path: '', pathMatch: 'full', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

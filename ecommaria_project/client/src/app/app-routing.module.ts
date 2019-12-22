import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CreateProductComponent } from './create-product/create-product.component'
import { ManageProductsComponent } from './manage-products/manage-products.component'
import { CategoryPageComponent } from './category-page/category-page.component';
import { ProductPageComponent } from './product-page/product-page.component';




const routes: Routes = [
  // { path: 'product',component: ProductComponent },
  { path: 'product/manage',component: ManageProductsComponent, children: [
    { path: 'new',component: CreateProductComponent },
  ]
},
  { path: 'product/:id',component: ProductPageComponent },
  { path: 'category/:id',component: CategoryPageComponent },
  // { path: 'products/:id/edit', component: ProductEditComponent },
  { path: '', pathMatch: 'full', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

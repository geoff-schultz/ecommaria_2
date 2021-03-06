import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CreateProductComponent } from './create-product/create-product.component'
import { ManageProductsComponent } from './manage-products/manage-products.component'
import { CategoryPageComponent } from './category-page/category-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ListProductComponent } from './list-product/list-product.component';
import { ListCategoryComponent } from './list-category/list-category.component';




const routes: Routes = [
  { path: 'product',component: ListProductComponent },
  { path: 'product/manage',component: ManageProductsComponent, children: [
    { path: 'edit/:id',component: EditProductComponent },
    { path: 'new',component: CreateProductComponent },
  ]
},
  { path: 'product/:id',component: ProductPageComponent },
  { path: 'category',component: ListCategoryComponent },
  { path: 'category/:id',component: CategoryPageComponent },
  // { path: 'products/:id/edit', component: ProductEditComponent },
  { path: '', pathMatch: 'full', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

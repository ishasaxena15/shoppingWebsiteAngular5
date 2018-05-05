/*
Routing of the app is defined here.
*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {HomeComponent} from './home/home.component';
import {CartComponent} from './cart/cart.component';

//Creating an instance of Routes module and assiging it the array of paths.
const routes: Routes = [
{
	path: 'product-detail/:id',
	component: ProductDetailComponent
},
{
	path: 'home',
	component: HomeComponent
},
{
	path: 'cart',
	component: CartComponent
},
{ 
	path: '', 
	redirectTo: '/home', 
	pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

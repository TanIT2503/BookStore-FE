import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BookCartComponent} from './book-cart/book-cart.component';


const routes: Routes = [
  {path: 'cart', component: BookCartComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListBookComponent} from './list-book/list-book.component';


const routes: Routes = [
  {path: 'store', component: ListBookComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookstoreRoutingModule { }

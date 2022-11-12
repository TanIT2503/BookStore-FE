import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListBookComponent} from './list-book/list-book.component';
import {DetailBookComponent} from './detail-book/detail-book.component';


const routes: Routes = [
  {path: '', component: ListBookComponent},
  {path: 'detail', component: DetailBookComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookstoreRoutingModule { }

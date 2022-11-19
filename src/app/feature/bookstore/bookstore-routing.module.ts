import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListBookComponent} from './list-book/list-book.component';
import {DetailBookComponent} from './detail-book/detail-book.component';
import {ListCategoryBookComponent} from './list-category-book/list-category-book.component';
import {SearchBookComponent} from './search-book/search-book.component';
import {PromotionsBookComponent} from './promotions-book/promotions-book.component';


const routes: Routes = [
  {path: '', component: ListBookComponent},
  {path: 'detail/:id', component: DetailBookComponent},
  {path: 'category/:id', component: ListCategoryBookComponent},
  {path: 'promotion', component: PromotionsBookComponent},
  {path: 'search/:searchKey', component: SearchBookComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookstoreRoutingModule { }

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ICartBook} from '../../model/cart/icart-book';
import {IBook} from '../../model/book/ibook';
import {ICart} from '../../model/cart/icart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private API_URL = 'http://localhost:8080/api/cart';

  constructor(
      private httpClient: HttpClient
  ) {
  }

  // findAllCart(): Observable<ICart[]> {
  //   return this.httpClient.get<ICart[]>(this.URI + '/list-cart');
  // }

  findAllCartBook(accountId: number): Observable<ICartBook[]> {
    return this.httpClient.get<ICartBook[]>(this.API_URL + '/list-cart-book?accountId=' + accountId);
  }

  updateQuantityCart(cartBook: ICartBook): Observable<void> {
    return this.httpClient.put<void>(this.API_URL + '/update-quantity', cartBook);
  }

  addBook(accountId: number, book: IBook): Observable<void> {
    return this.httpClient.post<void>(this.API_URL + '/add-book?accountId=' + accountId, book);
  }

  deleteBookCart(cartId: number): Observable<void> {
    return this.httpClient.delete<void>(this.API_URL + '/cart-delete?cardId=' + cartId);
  }

  paymentCart(cartList: ICart[]): Observable<void> {
    return this.httpClient.put<void>(this.API_URL + '/payment', cartList);
  }
}

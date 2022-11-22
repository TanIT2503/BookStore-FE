import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ICustomer} from '../../model/customer/icustomer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private API_URL= 'http://localhost:8080/api/customer';

  constructor(
      private httpClient: HttpClient
  ) {
  }

  // findAllCart(): Observable<ICart[]> {
  //   return this.httpClient.get<ICart[]>(this.URI + '/list-cart');
  // }

  findCustomerByAccountId(accountId: number): Observable<ICustomer> {
    return this.httpClient.get<ICustomer>(this.API_URL + '/getCustomerByAccount?accountId=' + accountId);
  }
}

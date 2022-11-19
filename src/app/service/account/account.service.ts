import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IAccount} from '../../model/account/iaccount';
import {ICustomerAccount} from '../../model/account/icustomer-account';


@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {
  API_URL = 'http://localhost:8080/api/account';
  constructor(private http: HttpClient) { }

  // NhiVP lay account theo username
  getAccountByUsername(username: string): Observable<IAccount> {
    return this.http.get<IAccount>(`${(this.API_URL)}/byUsername/${username}`);
  }
  // NhiVP lay danh sach username
  getAllUsername(): Observable<string[]> {
    return this.http.get<string[]>(this.API_URL + '/list-Username');
  }
  createCustomerAccount(customerAccount: ICustomerAccount): Observable<ICustomerAccount> {
    return this.http.post<ICustomerAccount>(this.API_URL + '/create-Customer-Account', customerAccount); }
}

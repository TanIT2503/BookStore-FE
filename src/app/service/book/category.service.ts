import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IBook} from '../../model/book/ibook';
import {ICategory} from '../../model/book/icategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private API_URL = 'http://localhost:8080/api/category';

  constructor(private http: HttpClient) {
  }

  getCategoryById(id: number): Observable<ICategory> {
    return this.http.get<ICategory>(`${this.API_URL}/${id}`);
  }

  getAllCategory(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.API_URL);
  }
}

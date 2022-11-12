import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IBook} from '../../model/book/ibook';
import {PageBook} from '../../model/book/page-book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

    private API_URL = 'http://localhost:8080/api/book';

    constructor(private http: HttpClient) {
    }

    getTopAllBook(thePage: number, thePageSize: number): Observable<GetResponseBook> {
        const url = `${this.API_URL}` + `&page=${thePage}&size=${thePageSize}`;
        return this.http.get<GetResponseBook>(url);
    }

    getTopNewBook(): Observable<IBook[]> {
        return this.http.get<IBook[]>(`${this.API_URL}/latest`);
    }

    getAll(page: number, search: string): Observable<PageBook> {
        return this.http.get<PageBook>(this.API_URL + '?page=' + page + '&&search=' + search);
    }
}

interface GetResponseBook {
    content: IBook[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}


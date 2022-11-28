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
    getBookById(id: number): Observable<IBook> {
        return this.http.get<IBook>(`${this.API_URL}/${id}`);
    }

    getTopAllBook(thePage: number, thePageSize: number): Observable<GetResponseBook> {
        const url = `${this.API_URL}` + `&page=${thePage}&size=${thePageSize}`;
        return this.http.get<GetResponseBook>(url);
    }

    getTopNewBook(page: number): Observable<IBook[]> {
        return this.http.get<IBook[]>(`${this.API_URL}/latest?page=` + page);
    }

    getOneNewBook(): Observable<IBook[]> {
        return this.http.get<IBook[]>(this.API_URL + '/one-book');
    }

    getAll(page: number, search: string): Observable<PageBook> {
        return this.http.get<PageBook>(this.API_URL + '?page=' + page + '&&search=' + search);
    }

    getAllBookByCategoryId(id: number, page: number): Observable<IBook[]> {
        return this.http.get<IBook[]>(this.API_URL + `/category/${id}?page=` + page);
    }
    getAllBookByPromotion(page: number): Observable<IBook[]> {
        return this.http.get<IBook[]>(this.API_URL + '/promotions');
    }

    searchBook(searchKey: string, page: number): Observable<IBook[]> {
        return this.http.get<IBook[]>(this.API_URL + `/search/${searchKey}?page=` + page);
    }
}

interface GetResponseBook {
    content: IBook[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}


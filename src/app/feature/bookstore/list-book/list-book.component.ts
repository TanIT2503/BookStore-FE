import { Component, OnInit } from '@angular/core';
import {NgOneTapService} from 'ng-google-one-tap';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../../service/security/token-storage.service';
import {IBook} from '../../../model/book/ibook';
import {BookService} from '../../../service/book/book.service';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {
    quantityCart: number;
    bookList: IBook[] = [];
    books: IBook = {};
    id: number;
    thePageNumber = 1;
    thePageSize = 6;
    theTotalElements: number;
    itemPerPage = 1;
    keywordSearch: undefined;
    constructor(
        private bookService: BookService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private tokenStorageService: TokenStorageService,
    ) { }

    ngOnInit(): void {
        this.getListTopBook();
    }

    getListCart() {
        // this.cartService.getAllCart().subscribe(data => {
        //     if (data == null) {
        //         this.quantityCart = 0;
        //     } else {
        //         this.quantityCart = data.length;
        //     }
        // });
    }

    // getAllListBook() {
    //     if (this.keywordSearch !== undefined) {
    //         this.search(this.keywordSearch);
    //     } else {
    //         this.getListTopBook();
    //     }
    // }

    getListTopBook() {
        this.bookService.getTopAllBook(this.thePageNumber - 1, this.thePageSize).subscribe(this.processResult());
    }

    processResult() {
        return (data) => {
            this.bookList = data.content; //
            this.thePageNumber = data.number + 1;
            this.thePageSize = data.size;
            this.theTotalElements = data.totalElements;
            this.processItemPerPage();
        };
    }

    processItemPerPage() {
        if (this.thePageNumber * this.thePageSize > this.theTotalElements) {
            this.itemPerPage = this.theTotalElements;
        } else {
            this.itemPerPage = this.thePageNumber * this.thePageSize;
        }
    }

    // search(value: string) {
    //     console.log(value);
    //     this.bookList.getAllMaterialSearch(this.thePageNumber - 1, this.thePageSize, value).subscribe(this.processResult());
    // }
}

import { Component, OnInit } from '@angular/core';
import {BookService} from '../../../service/book/book.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IBook} from '../../../model/book/ibook';

@Component({
    selector: 'app-billboard',
    templateUrl: './billboard.component.html',
    styleUrls: ['./billboard.component.css']
})
export class BillboardComponent implements OnInit {

    book: IBook[] = [];
    constructor(private bookService: BookService,
                private router: Router,
                private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.getOneNewBook();
    }

    getOneNewBook() {
        this.bookService.getOneNewBook().subscribe(book => {
            this.book = book;
            console.log(book);
        });
    }

}

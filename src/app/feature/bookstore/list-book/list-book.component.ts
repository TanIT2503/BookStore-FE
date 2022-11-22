import { Component, OnInit } from '@angular/core';
import {NgOneTapService} from 'ng-google-one-tap';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../../service/security/token-storage.service';
import {IBook} from '../../../model/book/ibook';
import {BookService} from '../../../service/book/book.service';
import {NotifierService} from 'angular-notifier';
import {HeaderComponent} from '../../../share/header/header.component';
import {CartService} from '../../../service/cart/cart.service';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {
    quantityCart: number;
    accountId: number;
    private roles: string[];
    isLoggedIn = false;
    showAdminBoard = false;
    showCustomer = false;
    userName: string;

    bookList: IBook[] = [];
    books: IBook = {};
    id: number;
    page = 1;
    size: number;
    theTotalElements: number;
    itemPerPage = 1;
    keywordSearch: undefined;
    constructor(
        private bookService: BookService,
        private router: Router,
        private cartService: CartService,
        private activatedRoute: ActivatedRoute,
        private tokenStorageService: TokenStorageService,
        private notification: NotifierService,
        private headerComponent: HeaderComponent
    ) { }

    ngOnInit(): void {
        // this.getListTopBook();
        this.getAllTopBook(this.page);
        this.isLoggedIn = !!this.tokenStorageService.getToken();
        if (this.isLoggedIn) {
            this.userName = this.tokenStorageService.getUser().account.username;
            this.roles = this.tokenStorageService.getUser().account.roles[0].roleName;
            // kiểm tra role
            this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
            this.showCustomer = this.roles.includes('ROLE_CUSTOMER');

            console.log('roles: ' + this.roles);
        }

        this.accountId = this.tokenStorageService.getUser().account.accountId;
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
        // this.bookService.getTopAllBook(this.thePageNumber - 1, this.thePageSize).subscribe(this.processResult());
    }

    addBook(bookAdd: IBook) {
        bookAdd.bookQuantity = 1;
        this.cartService.addBook(this.accountId, bookAdd).subscribe(() => {
        }, (error) => {
            this.notification.notify('error', error.error);
        }, () => {
            this.notification.notify('success', 'Thêm sách vào giỏ hàng thành công');
            this.headerComponent.getQuantityCart();
        });
        console.log(this.accountId);
    }
    getAllTopBook(page: number) {
        this.page = page;
        this.bookService.getTopNewBook(this.page - 1).subscribe((data: any) => {
                this.bookList = data.content;
                this.size = data.size;
                this.theTotalElements = data.totalElements;
            },
            () => {
                this.page--;
                this.getAllTopBook(this.page);
            },
            () => {
            }
        );
    }

    // processResult() {
    //     return (data) => {
    //         this.bookList = data.content; //
    //         this.thePageNumber = data.number + 1;
    //         this.thePageSize = data.size;
    //         this.theTotalElements = data.totalElements;
    //         this.processItemPerPage();
    //     };
    // }
    //
    // processItemPerPage() {
    //     if (this.thePageNumber * this.thePageSize > this.theTotalElements) {
    //         this.itemPerPage = this.theTotalElements;
    //     } else {
    //         this.itemPerPage = this.thePageNumber * this.thePageSize;
    //     }
    // }

    // search(value: string) {
    //     console.log(value);
    //     this.bookList.getAllMaterialSearch(this.thePageNumber - 1, this.thePageSize, value).subscribe(this.processResult());
    // }
}

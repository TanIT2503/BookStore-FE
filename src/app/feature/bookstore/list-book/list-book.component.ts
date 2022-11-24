import { Component, OnInit } from '@angular/core';
import {NgOneTapService} from 'ng-google-one-tap';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../../service/security/token-storage.service';
import {IBook} from '../../../model/book/ibook';
import {BookService} from '../../../service/book/book.service';
import {HeaderComponent} from '../../../share/header/header.component';
import {CartService} from '../../../service/cart/cart.service';
import {NgxNotificationService, NotificationType} from '@flywine93/ngx-notification';

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
        private notification: NgxNotificationService,
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

    addBook(bookAdd: IBook) {
        bookAdd.bookQuantity = 1;
        this.cartService.addBook(this.accountId, bookAdd).subscribe(() => {
        }, (error) => {
            // @ts-ignore
            this.notification.notify(NotificationType.Info, 'error', error.error);
        }, () => {
            // @ts-ignore
            this.notification.notify(NotificationType.SUCCESS, 'Success', 'Product added to cart successfully!', 3000);
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
}

import { Component, OnInit } from '@angular/core';
import {IBook} from '../../../model/book/ibook';
import {BookService} from '../../../service/book/book.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {NotificationType} from 'ngx-notification-bar';
import {CartService} from '../../../service/cart/cart.service';
import {HeaderComponent} from '../../../share/header/header.component';
import {TokenStorageService} from '../../../service/security/token-storage.service';
import {NgxNotificationService} from '@flywine93/ngx-notification';

@Component({
    selector: 'app-detail-book',
    templateUrl: './detail-book.component.html',
    styleUrls: ['./detail-book.component.css']
})
export class DetailBookComponent implements OnInit {
    book: IBook;
    id: number;
    bookListByAuthor: IBook[] = [];
    promotionPrice: number;

    accountId: number;
    private roles: string[];
    isLoggedIn = false;
    showAdminBoard = false;
    showCustomer = false;
    userName: string;
    constructor(private bookService: BookService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private cartService: CartService,
                private tokenStorageService: TokenStorageService,
                private notification: NgxNotificationService,
                private headerComponent: HeaderComponent
    ) {
        this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
            this.id = +param.get('id');
            this.getBook(this.id);
        });
    }
    getBook(id: number) {
        return this.bookService.getBookById(id).subscribe((book) => {
            this.book = book;
        });
    }
    ngOnInit(): void {
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
            this.notification.notify(NotificationType.Info, 'Success', 'Product added to cart successfully!', 3000);
            this.headerComponent.getQuantityCart();
        });
        console.log(this.accountId);
    }
}

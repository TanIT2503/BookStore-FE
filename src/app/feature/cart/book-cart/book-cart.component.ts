import { Component, OnInit } from '@angular/core';
import {ICartBook} from '../../../model/cart/icart-book';
import {ICustomer} from '../../../model/customer/icustomer';
import {ICart} from '../../../model/cart/icart';
import {TokenStorageService} from '../../../service/security/token-storage.service';
import {CartService} from '../../../service/cart/cart.service';
import {CustomerService} from '../../../service/account/customer.service';
import {NotifierService} from 'angular-notifier';

@Component({
    selector: 'app-book-cart',
    templateUrl: './book-cart.component.html',
    styleUrls: ['./book-cart.component.css']
})
export class BookCartComponent implements OnInit {
// cartList: ICart[] = [];
    // cartForm: FormGroup;
    cartBookList: ICartBook[] = [];
    accountId: number;
    checkList: boolean[] = [];
    checkAll = false;
    money = 0.0;
    totalMoney = 0.0;

    moneyBeforePromotion = 0.0;
    totalMoneyBeforePromotion = 0.0;

    cartDelete: ICartBook = {
        cartId: {},
        bookId: {}
    };

    cartErr: ICart;

    customer: ICustomer = {};
    cartPaymentList: ICart[] = [];
    constructor(
        private tokenStorageService: TokenStorageService,
        private notification: NotifierService,
        private cartService: CartService,
        private customerService: CustomerService
    ) {
    }

    ngOnInit(): void {
        this.accountId = this.tokenStorageService.getUser().account.accountId;
        this.customerService.findCustomerByAccountId(this.accountId).subscribe((data: ICustomer) => {
            this.customer = data;
        }, () => {
        }, () => {
        });

        this.findAllCartBook();

        this.getTotalMoney();
    }

    findAllCartBook() {
        this.cartService.findAllCartBook(this.accountId).subscribe((data: ICartBook[]) => {
            this.cartBookList = data;
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < data.length; i++) {
                this.checkList.push(false);
            }
        },
            (error) => {
                if (error.status === 404) {
                    this.cartErr = error.error;
                }
            });
        console.log('cart: ', this.cartBookList);
    }

    subBook(cartBook: ICartBook) {
        cartBook.cartId.cartQuantity = cartBook.cartId.cartQuantity - 1;
        this.cartService.updateQuantityCart(cartBook).subscribe(data => {
        }, () => {
        }, () => {
            this.findAllCartBook();
            this.getTotalMoney();
        });
    }

    addBook(cartBook: ICartBook) {
        cartBook.cartId.cartQuantity = cartBook.cartId.cartQuantity + 1;
        this.cartService.updateQuantityCart(cartBook).subscribe(data => {
        }, () => {
        }, () => {
            this.findAllCartBook();
            this.getTotalMoney();
        });
    }

    isAllChecked() {
        if (this.checkAll) {
            this.checkAll = false;
        } else {
            this.checkAll = true;
        }

        if (this.checkAll) {
            this.checkList.forEach((checked, index) => {
                this.checkList[index] = true;
            });
        } else {
            this.checkList.forEach((checked, index) => {
                this.checkList[index] = false;
            });
        }

        this.getTotalMoney();
    }

    isChecked(i: number) {
        if (this.checkList[i]) {
            this.checkList[i] = false;
        } else {
            this.checkList[i] = true;
        }
        this.getTotalMoney();
    }

    getTotalMoney() {
        this.cartService.findAllCartBook(this.accountId).subscribe((data: ICartBook[]) => {
            this.cartBookList = data;
            this.cartBookList.forEach((check, index) => {
                if (this.checkList[index]) {
                    this.money += this.cartBookList[index].bookId.bookPrice * this.cartBookList[index].cartId.cartQuantity
                        - (this.cartBookList[index].bookId.bookPrice * this.cartBookList[index].cartId.cartQuantity
                            * (this.cartBookList[index].bookId.bookPromotionId.promotion_percent / 100));

                    this.moneyBeforePromotion += this.cartBookList[index].bookId.bookPrice * this.cartBookList[index].cartId.cartQuantity;
                }
            });
            this.totalMoney = this.money;
            this.money = 0.0;

            this.totalMoneyBeforePromotion = this.moneyBeforePromotion;
            this.moneyBeforePromotion = 0.0;

            console.log(this.totalMoneyBeforePromotion);
            console.log(this.totalMoney);
        });
    }
    getQuantity(quantity: any, cartBook: ICartBook) {
        cartBook.cartId.cartQuantity = quantity.value;
        this.cartService.updateQuantityCart(cartBook).subscribe(data => {
        }, () => {
        }, () => {
            this.findAllCartBook();
            this.getTotalMoney();
        });
    }
    showInfoCartDelete(cartBookDelete: ICartBook) {
        this.cartDelete = cartBookDelete;
    }

    deleteCart(cartBookId: number) {
        console.log(cartBookId);
        this.cartService.deleteBookCart(cartBookId).subscribe(
            () => {
            },
            () => {
            },
            () => {
                this.findAllCartBook();
                // this.getImportListNotPagination();
                this.notification.notify('success', 'Xoá sản phẩm thành công');
            });
    }

    payment() {
        this.cartBookList.forEach((check, index) => {
            if (this.checkList[index]) {
                this.cartPaymentList.push(this.cartBookList[index].cartId);
            }
        });

        this.cartService.paymentCart(this.cartPaymentList).subscribe(data => {
        }, () => {
        }, () => {
            this.notification.notify('success', 'Thanh toán thành công');
            window.location.assign('/cart');
        });
    }
}

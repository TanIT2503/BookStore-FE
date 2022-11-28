import { Component, OnInit } from '@angular/core';
import {IBook} from '../../../model/book/ibook';
import {ICategory} from '../../../model/book/icategory';
import {BookService} from '../../../service/book/book.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {TokenStorageService} from '../../../service/security/token-storage.service';
import {CategoryService} from '../../../service/book/category.service';
import {HeaderComponent} from '../../../share/header/header.component';
import {CartService} from '../../../service/cart/cart.service';
import {NotificationType} from '@flywine93/ngx-notification';

@Component({
  selector: 'app-list-category-book',
  templateUrl: './list-category-book.component.html',
  styleUrls: ['./list-category-book.component.css']
})
export class ListCategoryBookComponent implements OnInit {
  accountId: number;
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showCustomer = false;
  userName: string;
  bookList: IBook[] = [];
  category: ICategory;
  id: number;
  page = 1;
  size: number;
  totalElements: number;
  currentDate = new Date();
  constructor(private bookService: BookService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private tokenStorageService: TokenStorageService,
              private categoryService: CategoryService,
              private headerComponent: HeaderComponent,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.id = +param.get('id');
      this.getAllBookByCategoryId(this.id, this.page);
      this.getCategory(this.id);
    });
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
      this.notification.notify(NotificationType.Info, 'Error', error.error);
    }, () => {
      // @ts-ignore
      this.notification.notify(NotificationType.SUCCESS, 'Success', 'Product added to cart successfully!', 3000);
      this.headerComponent.getQuantityCart();
    });
    console.log(this.accountId);
  }

  getAllBookByCategoryId(id: number, page: number) {
    this.page = page;
    this.bookService.getAllBookByCategoryId(id, this.page - 1).subscribe((data: any) => {
          this.bookList = data.content;
          this.size = data.size;
          this.totalElements = data.totalElements;
        },
        () => {
          this.page--;
          this.getAllBookByCategoryId(id, this.page);
        },
        () => {
        }
    );
  }
  getCategory(id: number) {
    return this.categoryService.getCategoryById(id).subscribe(data => {
      this.category = data;
    });
  }

}

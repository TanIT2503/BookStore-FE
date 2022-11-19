import { Component, OnInit } from '@angular/core';
import {IBook} from '../../../model/book/ibook';
import {ICategory} from '../../../model/book/icategory';
import {BookService} from '../../../service/book/book.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {TokenStorageService} from '../../../service/security/token-storage.service';
import {CategoryService} from '../../../service/book/category.service';

@Component({
  selector: 'app-list-category-book',
  templateUrl: './list-category-book.component.html',
  styleUrls: ['./list-category-book.component.css']
})
export class ListCategoryBookComponent implements OnInit {
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
              private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.id = +param.get('id');
      this.getAllBookByCategoryId(this.id, this.page);
      this.getCategory(this.id);
    });
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

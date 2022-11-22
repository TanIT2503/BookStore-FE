import {IBook} from '../book/ibook';
import {ICart} from './icart';

export interface ICartBook {
    cartBookId?: number;
    cartId?: ICart;
    bookId?: IBook;
}

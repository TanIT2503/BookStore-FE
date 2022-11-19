import {IAccount} from './iaccount';
import {ICustomer} from '../customer/icustomer';

export interface ICustomerAccount {
    customer?: ICustomer;
    account?: IAccount;
}

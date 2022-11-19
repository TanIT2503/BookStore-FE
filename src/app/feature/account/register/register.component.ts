import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountServiceService} from '../../../service/account/account.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    createForm: FormGroup;
    confirmPassCheck: string;
    error: any[] = [];
    checkUsername: string;
    constructor(private accountService: AccountServiceService,
                private formBuilder: FormBuilder, private router: Router) { }

    ngOnInit(): void {
        this.createForm = this.formBuilder.group({
            customer: this.formBuilder.group({
                // tslint:disable-next-line:max-line-length
                customerName: ['', [Validators.required, Validators.maxLength(49), Validators.minLength(8), Validators.pattern('^[A-ZÀ|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ|È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ|Ì|Í|Ị|Ỉ|Ĩ|Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ|Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ|Ỳ|Ý|Ỵ|Ỷ|Ỹ|Đ][a-zà|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ|è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ|ì|í|ị|ỉ|ĩ|ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ|ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ|ỳ|ý|ỵ|ỷ|ỹ]*([ ][A-ZÀ|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ|È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ|Ì|Í|Ị|Ỉ|Ĩ|Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ|Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ|Ỳ|Ý|Ỵ|Ỷ|Ỹ|Đ][a-zà|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ|è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ|ì|í|ị|ỉ|ĩ|ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ|ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ|ỳ|ý|ỵ|ỷ|ỹ]*)*$')]],
                // tslint:disable-next-line:max-line-length
                customerPhone: ['', [Validators.required, Validators.pattern('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]],
                customerEmail: ['', [Validators.required, Validators.pattern('(\\W|^)[\\w.+\\-]*@gmail\\.com(\\W|$)')]],
                customerAddress: ['', [Validators.required, Validators.maxLength(59), Validators.minLength(5)]]
            }),
            account: this.formBuilder.group({
                username: ['', [Validators.required, Validators.maxLength(19), Validators.pattern('[a-z]|[0-9]{3,20}$')]],
                // tslint:disable-next-line:max-line-length
                password: ['', [Validators.required, Validators.maxLength(19), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$')]],
                confirmPassword: ['', [Validators.required]]
            })
        });
        // @ts-ignore
        // tslint:disable-next-line:max-line-length
        this.createForm.setValidators(this.passValidator(this.createForm.get('account').get('password'), this.createForm.get('account').get('confirmPassword')));
    }

    passValidator(control: AbstractControl, controlTwo: AbstractControl): () => (string | null) {
        return () => {
            if (control.value !== controlTwo.value) {
                return this.confirmPassCheck = 'Repeat password do not match.';
            }
            return this.confirmPassCheck = '';
        };
    }
    submit() {
        const customerAccount = Object.assign({}, this.createForm.value);
        this.accountService.createCustomerAccount(customerAccount).subscribe(
            () => {
            }, (error) => {
                console.log(error);
            }, () => {
                console.log(customerAccount);
                this.router.navigateByUrl('/register');
                this.createForm.reset();
            });
    }
}

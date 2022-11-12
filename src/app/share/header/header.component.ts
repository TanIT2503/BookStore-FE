import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../service/security/token-storage.service';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {NgOneTapService} from 'ng-google-one-tap';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    searchForm: FormGroup;

    private roles: string[];
    isLoggedIn = false;
    roleAdmin = false;
    roleUser = false;
    userName: string;
    constructor(private tokenStorageService: TokenStorageService,
                private router: Router,
                private onetap: NgOneTapService,) { }

    ngOnInit(): void {
        this.checkRole();
        this.loadLogin();
    }
    checkRole(): void{
        this.isLoggedIn = !!this.tokenStorageService.getToken();
        if (this.isLoggedIn) {
            this.userName = this.tokenStorageService.getUser().account.username;
            this.roles = this.tokenStorageService.getUser().account.roles[0].roleName;
            this.roleAdmin = this.roles.includes('ROLE_ADMIN');
            this.roleUser = this.roles.includes('ROLE_USER');
            console.log('roles: ' + this.roles);
        }
    }
    loadLogin(): void {
        this.onetap.tapInitialize();
        this.onetap.promtMoment.subscribe(res => {
            res.getDismissedReason();
            res.getMomentType();
            res.getNotDisplayedReason();
            res.getSkippedReason();
            res.isDismissedMoment();
            res.isDisplayed();
            res.isNotDisplayed();
            res.isSkippedMoment();
        });
        this.onetap.oneTapCredentialResponse.subscribe(res => {
            console.log(res.credential);
            const token = res.credential;
            const name = res.credential;
            console.log(res);
            this.tokenStorageService.saveTokenLocal(token);
            this.router.navigate(['/']);
        });

    }
    logout() {
        this.tokenStorageService.signOut();
        window.location.assign('');
        this.router.navigateByUrl('');
    }

}
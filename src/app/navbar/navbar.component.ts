import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService, AlertService } from '@/_services';
import { User } from '@/_models';

@Component({ 
    selector: 'navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.css']
})
export class NavbarComponent {

    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.authenticationService.logout()
        .pipe(first())
        .subscribe(
            () => {
                this.router.navigate(['/login']);
            },
            error => {
                this.alertService.error(error);
            });;
    }
}
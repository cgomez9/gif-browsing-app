import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, AlertService } from '@/_services';

@Component({ 
    selector: 'search-result',
    templateUrl: 'search-result.component.html',
    styleUrls: ['search-result.component.css']
})
export class SearchResultComponent {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
    }

}
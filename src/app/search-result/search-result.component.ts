import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, AlertService, MessageService } from '@/_services';
import { Subscription } from 'rxjs';

@Component({ 
    selector: 'search-result',
    templateUrl: 'search-result.component.html',
    styleUrls: ['search-result.component.css']
})
export class SearchResultComponent {
    gifs = [];
    subscription: Subscription;
    
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private messageService: MessageService
    ) {
        // subscribe to home component messages
        this.subscription = this.messageService.getMessage().subscribe(message => {
            if (message) {
                this.gifs = message;
            } else {
                // clear messages when empty message received
                this.gifs = [];
            }
          });
    }

}
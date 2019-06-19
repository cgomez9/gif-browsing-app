import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { AuthenticationService, MessageService } from '@/_services';

@Component({ 
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent {
    searchString: string;

    constructor(private messageService: MessageService) { }

    ngOnInit() {}

    search() {
        this.sendMessage(this.searchString);
    }

    sendMessage(message: string): void {
        // send message to subscribers via observable subject
        this.messageService.sendMessage(message);
    }

    clearMessages(): void {
        this.messageService.clearMessages();
    }
}
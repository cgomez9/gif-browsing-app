import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { AuthenticationService, MessageService } from '@/_services';

@Component({ 
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent {
    users: User[] = [];

    constructor(private messageService: MessageService) { }

    ngOnInit() {
        // this.userService.getAll().pipe(first()).subscribe(users => {
        //     this.users = users;
        // });
    }
}
import { Component } from '@angular/core';

import { GifMetadata } from '@/_models';
import { MessageService, AlertService } from '@/_services';
import { CoreService } from '@/_services/core.service';

@Component({ 
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent {
    searchString: string;

    constructor(
        private messageService: MessageService, 
        private coreService: CoreService,
        private alertService: AlertService) { }

    ngOnInit() {}

    search() {
        this.coreService.searchGIFs(this.searchString).subscribe(
            res => {
                this.sendMessage({ data: res['result'] as GifMetadata, target : 'search' });
                this.saveHistory();
            },
            err => {
                this.alertService.error("An unexpected error ocurred while searching, please try again later")
            }
        );
    }

    sendMessage(message: any): void {
        // send message to subscribers via observable subject
        this.messageService.sendMessage(message);
    }

    clearMessages(): void {
        this.messageService.clearMessages();
    }

    saveHistory() {
        this.coreService.setSearchHistory(this.searchString).subscribe( 
            res => {}, err => {
                this.alertService.error("An unexpected error ocurred saving the history.")
            }
        );
    }
}
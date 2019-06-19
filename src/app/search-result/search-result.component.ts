import { Component } from '@angular/core';

import { AlertService, MessageService } from '@/_services';
import { Subscription } from 'rxjs';
import { GifMetadata } from '@/_models';
import { Lightbox } from 'ngx-lightbox';
import { CoreService } from '@/_services/core.service';

@Component({ 
    selector: 'search-result',
    templateUrl: 'search-result.component.html',
    styleUrls: ['search-result.component.css']
})
export class SearchResultComponent {
    gifs: GifMetadata;
    _album = [];
    subscription: Subscription;
    
    constructor(
        private alertService: AlertService,
        private messageService: MessageService,
        private _lightbox: Lightbox,
        private coreService: CoreService
    ) {
        // subscribe to home component messages
        this.subscription = this.messageService.getMessage().subscribe(message => {
            if (message) {
                this._album = [];
                this.gifs = message;
                this.gifs.data.map( gif => {
                    const album = {
                        src: gif.images.original.url,
                        caption: gif.title,
                        thumb: gif.images.fixed_height_still.url,
                        favorite: gif.favorite
                    };
                    this._album.push(album);
                });
            } 
        });
    }

    open(index: number): void {
        // open lightbox
        this._lightbox.open(this._album, index, { 
            fitImageInViewPort : false,
            centerVertically : true,
            wrapAround : true,
            alwaysShowNavOnTouchDevices : true,
            showImageNumberLabel : true

        });
    }

    onFavorite(index: number): void {
        this.coreService.setFavoriteGIF(this.gifs.data[index].id).subscribe(
            res => {
                this._album[index].favorite = true;
                this.alertService.success(`GIF '${this._album[index].caption} was added to your favorites!'`)
            },
            err => {
                this.alertService.error("An unexpected error ocurred, please try again later")
            }
        );
    }
     
    close(): void {
        // close lightbox programmatically
        this._lightbox.close();
    }

}
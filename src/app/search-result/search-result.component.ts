import { Component, Input } from '@angular/core';

import { AlertService, MessageService } from '@/_services';
import { Subscription } from 'rxjs';
import { GifMetadata, FavoriteGif, Gif } from '@/_models';
import { Lightbox } from 'ngx-lightbox';
import { CoreService } from '@/_services/core.service';

@Component({ 
    selector: 'search-result',
    templateUrl: 'search-result.component.html',
    styleUrls: ['search-result.component.css']
})
export class SearchResultComponent {
    @Input() loading: boolean;
    gifs: GifMetadata;
    favoriteGifs: FavoriteGif[];
    _album = [];
    subscription: Subscription;
    search: boolean = false;
    target: string;
    scrollIndex = 0;
    CHUNK = 12; // Amount of GIFs to load by chunk
    display = []; // GIFS to display
    
    constructor(
        private alertService: AlertService,
        private messageService: MessageService,
        private _lightbox: Lightbox,
        private coreService: CoreService
    ) {
        // subscribe to home component messages
        this.subscription = this.messageService.getMessage().subscribe(message => {
            if (message) {
                this.loading = true;
                this.target = message.target;
                if (message.target == 'search' || message.target == 'trending') {
                    this.searchHandler(message.data);
                } else if (message.target == 'favorite') {
                    this.favoriteHandler(message.data);
                }
            } 
        });
    }

    searchHandler(data) {
        this.resetDisplay();
        this.gifs = data;
        this.gifs.data.map( gif => {
            const album = {
                src: gif.images.original.url,
                caption: gif.title,
                thumb: gif.images.fixed_height_still.url,
                favorite: gif.favorite,
                id: gif.id
            };
            this._album.push(album);
        });
        this.displayGIFsChunks();
        this.loading = false;
        this.search = true;
    }

    favoriteHandler(data) {
        this.resetDisplay();
        this.favoriteGifs = data;
        const ids = this.favoriteGifs.map( (favorite) => favorite.gif_id );
        if (ids.length > 0) {
            this.coreService.getGIFs(ids.join()).subscribe(
                res => {
                    let favoriteGif = res['result'] as GifMetadata;
            
                    favoriteGif.data.map( gif => {
                        const album = {
                            src: gif.images.original.url,
                            caption: gif.title,
                            thumb: gif.images.fixed_height_still.url,
                            favorite: true,
                            id: gif.id
                        };
                        this._album.push(album);
                    });
                    this.displayGIFsChunks();
                    this.loading = false;
                    this.search = true;
                },
                err => {
                    this.alertService.error("An unexpected error ocurred, please try again later")
                }
            );
        } else {
            this.search = true;
        }
    }

    resetDisplay() {
        this._album = [];
        this.display = [];
        this.scrollIndex = 0;
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
        if (!this._album[index].favorite) {
            this.setFavorite(index);
        } else {
            this.deleteFavorite(index);
        }
    }

    setFavorite(index) {
        this.coreService.setFavoriteGIF(this._album[index].id).subscribe(
            res => {
                this._album[index].favorite = true;
                this.display[index].favorite = true;
                // this.alertService.success(`GIF '${this._album[index].caption}' was added to your favorites!`)
            },
            err => {
                this.alertService.error("An unexpected error ocurred, please try again later")
            }
        );
    }

    deleteFavorite(index) {
        this.coreService.deleteFavoriteGIFs(this._album[index].id).subscribe(
            res => {
                this._album[index].favorite = false;
                this.display[index].favorite = false;
                // this.alertService.success(`GIF '${this._album[index].caption}' was deleted from your favorites!`)
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

    loadMore() {
        if (!this.loading) {
            this.loading = true;
            this.displayGIFsChunks();
            this.loading = false;
        }
    }
  
    /**
     * Adds more GIFs to display, based on current index chunk
     */
    private displayGIFsChunks(reset? : boolean) {
        let copy;
        if (reset) {
          this.scrollIndex = 0;
          copy = [];
        } else {
          copy = JSON.parse(JSON.stringify(this.display));
        }
        let start = this.scrollIndex * this.CHUNK;
        let end = start + this.CHUNK;
        if (end > this._album.length) end = this._album.length;
        for (let i = start; i < end; i++) {
          copy.push(this._album[i]);
        }
        this.display = copy;
        this.scrollIndex++;
    }

}
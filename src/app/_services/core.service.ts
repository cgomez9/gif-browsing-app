import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

import { User, GifMetadata } from '@/_models';
import { Gif } from '@/_models/gif';

@Injectable({ providedIn: 'root' })
export class CoreService {

    constructor(private http: HttpClient) {
    }

    // GIPHY SERVICES

    searchGIFs(keyword: string){
        return this.http.get(`${environment.apiUrl}/gif/search/${keyword}`, {}).
            pipe(map(res => {
                return res;
            },err => {
                return err;
            }));
    }

    getGIF(id: string){
        return this.http.get(`${environment.apiUrl}/gif/${id}`, {}).
            pipe(map(res => {
                return res;
            },err => {
                return err;
            }));
    }

    getGIFs(ids: string){
        return this.http.get(`${environment.apiUrl}/gif/multiple/${ids}`, {}).
            pipe(map(res => {
                return res;
            },err => {
                return err;
            }));
    }

    getTrendingGIFs(){
        return this.http.get(`${environment.apiUrl}/gif/trending`, {}).
            pipe(map(res => {
                return res;
            },err => {
                return err;
            }));
    }

    // FAVORITE GIF SERVICES

    getFavoriteGIFs() {
        return this.http.get(`${environment.apiUrl}/favorite`, {}).
            pipe(map(res => {
                console.log(res);
                return res;
            },err => {
                return err;
            }));
    }

    setFavoriteGIF(gifId: string) {

        let httpParams = new HttpParams().append('gif_id', gifId)

        return this.http.post(`${environment.apiUrl}/favorite`, httpParams).
            pipe(map(res => {
                return res;
            },err => {
                return err;
            }));
    }

    deleteFavoriteGIFs(gifId: string) {
        return this.http.delete(`${environment.apiUrl}/favorite/${gifId}`, {}).
            pipe(map(res => {
                return res;
            },err => {
                return err;
            }));
    }

    // SEARCH HISTORY SERVICES 

    getSearchHistory() {
        return this.http.get(`${environment.apiUrl}/history`, {}).
            pipe(map(res => {
                return res;
            },err => {
                return err;
            }));
    }

    setSearchHistory(searchString: string) {

        let httpParams = new HttpParams().append('search_string', searchString)

        return this.http.post(`${environment.apiUrl}/history`, httpParams).
            pipe(map(res => {
                return res;
            },err => {
                return err;
            }));
    }

}
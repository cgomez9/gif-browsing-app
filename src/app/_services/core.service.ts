import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

import { User } from '@/_models';

@Injectable({ providedIn: 'root' })
export class CoreService {

    constructor(private http: HttpClient) {
    }

    searchGIFs(keyword: string) {
        return this.http.get(`${environment.apiUrl}/search/${keyword}`, {}).
            pipe(map(res => {
                console.log(res);
                return res;
            },err => {
                return err;
            }));
    }

}
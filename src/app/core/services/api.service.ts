import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService{
    constructor(private http: HttpClient) { }


    // const httpOptions = {
    //     headers: new HttpHeaders({
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json'
    //     })
    // }

    post(path: string, body: Object = {}) : Observable<any> {
        return this.http.post(
            `${environment.api_url}${path}`,
             JSON.stringify(body))
    }
}
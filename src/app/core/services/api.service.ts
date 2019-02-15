import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService{
    constructor(private http: HttpClient) { }


     httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'my-auth-token',
        })
      };
      

    post(path: string, body: Object = {}) : Observable<any> {
        return this.http.post(
            `${environment.api_url}${path}`,
             JSON.stringify(body),this.httpOptions);
    }

    get(path: string, params: HttpParams = new HttpParams()) : Observable<any> {
      console.log(`${environment.api_url}${path}`);
      return this.http.get(
        `${environment.api_url}`, { params }
      );
      
    }
}
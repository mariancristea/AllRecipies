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
          'Access-Control-Allow-Origin': 'https://localhost:3000',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }),
        withCredentials : true
      };
      


    post(path: string, body: Object = {}) : Observable<any> {
        return this.http.post(
            `${environment.api_url}${path}`,
             JSON.stringify(body));
    }

    put(path: string, body: Object = {}): Observable<any> {
      return this.http.put(
        `${environment.api_url}${path}`,
        JSON.stringify(body)
      );
    }

    get(path: string, params: HttpParams = new HttpParams()) : Observable<any> {
      return this.http.get(
        `${environment.api_url}${path}`, { params }
      );
    }

    delete(path): Observable<any> {
      return this.http.delete(
        `${environment.api_url}${path}`
      )
    }
}
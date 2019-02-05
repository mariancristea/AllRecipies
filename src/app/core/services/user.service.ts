import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';
import { map ,  distinctUntilChanged } from 'rxjs/operators';
import { User } from '../models';
import { ApiService } from './api.service';

import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
    private currentUserSubject = new BehaviorSubject<User>({} as User);
    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor(
        private apiService: ApiService
        
    ) {}

    setAuth(user : User) {
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
    }

    attemptAuth(type, credentials): Observable<User> {
        const route = (type === 'login') ? '/login' : '';
        console.log(credentials);
        return this.apiService.post('/users' + route, {user: credentials})
            .pipe(map(
                data => {
                    this.setAuth(data.user)
                    return data;
                }
            ))
    }
}
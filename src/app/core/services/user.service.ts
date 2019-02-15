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
        console.log('Set Auth');
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
    }

    purgeAuth() {
        this.isAuthenticatedSubject.next(false);
    }

    logOut() {
        console.log('From uSEr');
        return this.apiService.get('/logout')
            .pipe(map(
                data => {
                    console.log(data);
                    return data;
                }
            ));
    }

    attemptAuth(type, credentials): Observable<User> {
        const route = (type === 'login') ? '/login' : '';
        return this.apiService.post('/users' + route, {user: credentials})
            .pipe(map(
                data => {
                    console.log(data.user);
                    this.setAuth(data.user)
                    return data;
                }
            ))
    }
}
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';
import { map ,  distinctUntilChanged } from 'rxjs/operators';
import { User } from '../models';
import { ApiService } from './api.service';

import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';

@Injectable()
export class UserService {
    private currentUserSubject = new BehaviorSubject<User>({} as User);
    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor(
        private apiService: ApiService,
        private jwtService: JwtService
        
    ) { console.log('Calll!Q!!!!!!!!')
        }
    
    populate()  {
        if(this.jwtService.getToken())  {
            this.apiService.get('/user')
            .subscribe(
              data => this.setAuth(data.user),
              err => this.purgeAuth()
            );
          } else {
            // Remove any potential remnants of previous auth states
            this.purgeAuth();
        }
    }


    setAuth(user : User) {
        console.log('Set Auth',user);
        this.jwtService.saveToken(user.token);
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
    }

    purgeAuth() {
        this.jwtService.destroyToken();
        this.currentUserSubject.next({} as User);
        this.isAuthenticatedSubject.next(false);
    }

    logOut(): Observable<any> {
        console.log('From uSEr');
        return this.apiService.get('/logout')
            .pipe(map(
                data => {
                    this.purgeAuth();
                    console.log('asdd',data);
                    return data;
                }
            ));
    }

    attemptAuth(type, credentials): Observable<User> {
        const route = (type === 'login') ? '/login' : '';
        return this.apiService.post('/users' + route, {user: credentials})
            .pipe(map(
                data => {
                    console.log('Ayempy');
                    console.log(data.user);
                    this.setAuth(data.user)
                    return data;
                }
            ))
    }
}
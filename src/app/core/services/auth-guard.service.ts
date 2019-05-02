import { CanActivate } from '@angular/router';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private userService: UserService
    ) {}

    canActivate(): Observable<boolean> {
        return this.userService.isAuthenticated.pipe(take(1));
    }
}

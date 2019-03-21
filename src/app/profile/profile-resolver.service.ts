import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Profile, ProfileServices } from '../core';



@Injectable()
export class ProfileResolver implements Resolve<Profile> {
    constructor(
        private profileService: ProfileServices,
        private router: Router
    )   { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        console.log('TTTTTTTTT');
        return this.profileService.get(route.params['username'])
            .pipe(catchError((err) => this.router.navigateByUrl('/')));
    }
}
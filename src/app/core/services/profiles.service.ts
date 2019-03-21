import { Injectable } from "@angular/core";
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Profile } from 'selenium-webdriver/firefox';
import { map } from 'rxjs/operators';


@Injectable()
export class ProfileServices {
    constructor (
        private apiService: ApiService
    ) {}

    get(username: string): Observable<Profile> {
        console.log('Profile servie');
        return this.apiService.get('/profiles/' + username)
            .pipe(map((data: {profile: Profile}) => data.profile));
    }
}
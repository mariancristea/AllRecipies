import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { UserService, User, Profile, RecipeListConfig } from '../core';

import { concatMap, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { SettingsComponent } from '../settings/settings.component';
import { AuthComponent } from '../auth/auth.component';




@Component({
    selector: 'app-profile-page',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private dialog: MatDialog
    )   { }

    profile: Profile;
    currentUser: User;
    isUser: boolean;
    listConfig: RecipeListConfig = {
        type: 'all',
        search: false,
        filters: {}
      };
      listConfig2: RecipeListConfig = {
        type: 'all',
        search: false,
        filters: {}
      };

    ngOnInit() {
        
        this.route.data.pipe(
            concatMap((data: { profile: Profile }) => {
                this.profile = data.profile;
                this.listConfig = {
                    type: 'all',
                    search: false,
                    filters: {}
                };
                this.listConfig.filters.favorited = this.profile.username;

                this.listConfig2 = {
                    type: 'all',
                    search: false,
                    filters: {}
                };
                this.listConfig2.filters.author = this.profile.username;
                console.log('Profile',data);
                return this.userService.currentUser.pipe(tap(
                    (userData: User) => {
                        console.log('userdata',userData);
                        this.currentUser = userData;
                        this.isUser = (this.currentUser.username === this.profile.username)
                    }
                ));
            })
        ).subscribe();
    }

    openSettingsDialog() : void {
        this.dialog.open(SettingsComponent, {
            width: '500px',
            height: '500px'
        })
    }

}
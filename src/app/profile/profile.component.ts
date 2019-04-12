import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { UserService, User, Profile, RecipeListConfig, Recipe, RecipeService } from '../core';

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
        private recipeService: RecipeService,
        private dialog: MatDialog
    )   { }

    profile: Profile;
    currentUser: User;
    isUser: boolean;
    listFavorites: RecipeListConfig;
    listYourRecipes: RecipeListConfig;
    favoritesRecipes: Recipe[];
    yourRecipes: Recipe[];

    ngOnInit() {
        
        this.route.data.pipe(
            concatMap((data: { profile: Profile }) => {
                this.profile = data.profile;
                this.listFavorites = {
                    type: 'all',
                    search: false,
                    filters: {}
                };
                this.listFavorites.filters.favorited = this.profile.username;

                this.listYourRecipes = {
                    type: 'all',
                    search: false,
                    filters: {}
                };
                this.listYourRecipes.filters.author = this.profile.username;

                this.runQueryFavorites();
                this.runQueryYourRecipes();

                return this.userService.currentUser.pipe(tap(
                    (userData: User) => {
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
    runQueryFavorites(){
        this.recipeService.query(this.listFavorites)
        .subscribe(data => {
            this.favoritesRecipes = data.recipes;
        });
    }

    runQueryYourRecipes(){
        this.recipeService.query(this.listYourRecipes)
        .subscribe(data => {
            this.yourRecipes = data.recipes;
        });
    }
}
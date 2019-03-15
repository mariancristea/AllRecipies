import { Component, Input, Output, EventEmitter } from "@angular/core";
import { UserService, RecipeService, Recipe } from 'src/app/core';
import { Router } from '@angular/router';
import { map, tap, concatMap, switchMap, first } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialModule } from '../../material.module'
import { MatDialog } from '@angular/material';
import { AuthComponent } from 'src/app/auth/auth.component';


@Component({
    selector: 'app-favorite-button',
    templateUrl: './favorite-button.component.html'
})
export class FavoriteButtonComponent {
    constructor(
        private userService: UserService,
        private recipeService: RecipeService,
        private router: Router,
        private dialog: MatDialog
    )   {}

    @Input() recipe: Recipe;
    @Output() toggle = new EventEmitter<boolean>();

    toggleFavorite(click: boolean) {
        click= false;
       var sub = this.userService.isAuthenticated.pipe(first(),
            switchMap(authenticated => {
                if(!authenticated)  {
                    const dialogRef = this.dialog.open(AuthComponent ,{
                        width: '600px',
                        height: '600px',
                        data: 'login'
                      });
                    return of(null);
                }
                else{
                    if(!this.recipe.favorited)  { 
                        return this.recipeService.favorite(this.recipe.slug)
                        .pipe(tap(
                            data => {
                                this.toggle.emit(true);
                            }
                        ))
                    } else {
                        return this.recipeService.unfavorite(this.recipe.slug)
                        .pipe(tap(
                            data => {
                                this.toggle.emit(false);
                            }
                        ))
                    } 
                }
               
            })
        ).subscribe();
       // sub.unsubscribe();
        

    }
}
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { UserService, RecipeService, Recipe } from 'src/app/core';
import { Router } from '@angular/router';
import { map, tap, concatMap, switchMap, first } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialModule } from '../../material.module'


@Component({
    selector: 'app-favorite-button',
    templateUrl: './favorite-button.component.html'
})
export class FavoriteButtonComponent {
    constructor(
        private userService: UserService,
        private recipeService: RecipeService,
        private router: Router
    )   {}

    @Input() recipe: Recipe;
    @Output() toggle = new EventEmitter<boolean>();

    toggleFavorite(click: boolean) {
        console.log('fav',click)
        click= false;
       var sub = this.userService.isAuthenticated.pipe(first(),
            switchMap(authenticated => {
                console.log('no',this.recipe.title);
                if(!authenticated)  {
                    this.router.navigateByUrl('/login');
                    return of(null);
                }
                else{
                    console.log('2222');
                    if(!this.recipe.favorited)  { console.log('3333');
                        return this.recipeService.favorite(this.recipe.slug)
                        .pipe(tap(
                            data => {
                                console.log('emit');
                                this.toggle.emit(true);
                            }
                        ))
                    } else {
                        return this.recipeService.unfavorite(this.recipe.slug)
                        .pipe(tap(
                            data => {
                                console.log('emit');
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
import { Component, Input } from '@angular/core';
import { Recipe, UserService, RecipeService } from 'src/app/core';
import { switchMap, first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AuthComponent } from 'src/app/auth/auth.component';
import { of } from 'rxjs';


@Component({
    selector: 'app-recipe-preview',
    templateUrl: './recipe-preview.component.html',
    styleUrls: ['./recipe-preview.component.css']
})

export class RecipePreviewComponent {
    @Input() recipe: Recipe;
    time: number;
    constructor(
        private userService: UserService,
        private recipeService: RecipeService,
        private dialog: MatDialog
    )   {}

    onToggleFavorite(favorited: boolean)  {
       this.recipe['favorited'] = favorited;
       if (favorited) {
           this.recipe['favoritesCount']++;
       } else {
        this.recipe['favoritesCount']--;
       }
    }

    toggleFavorite() {
        this.userService.isAuthenticated.pipe(
            first(),
            switchMap(authenticated => {
                if (!authenticated)  {
                    console.log('WUT');
                    const dialogRef = this.dialog.open(AuthComponent , {
                        width: '600px',
                        height: '600px',
                        data: 'login'
                      });
                    return of(null);
                } else {
                    this.onToggleFavorite(!this.recipe['favorited']);
                    if (this.recipe['favorited'])  {
                        return this.recipeService.favorite(this.recipe.slug);
                    }
                }

            })
        ).subscribe();
    }
}


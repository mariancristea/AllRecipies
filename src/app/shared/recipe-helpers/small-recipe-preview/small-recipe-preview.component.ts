import { Component, Input } from "@angular/core";
import { Recipe, UserService, RecipeService } from 'src/app/core';
import { switchMap, first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AuthComponent } from 'src/app/auth/auth.component';
import { of } from 'rxjs';


@Component({
    selector: 'app-small-recipe-preview',
    templateUrl: './small-recipe-preview.component.html',
    styleUrls: ['./small-recipe-preview.component.css']
})

export class SmallRecipePreviewComponent {
    @Input() recipe: Recipe;

    constructor(
        private userService: UserService,
        private recipeService: RecipeService,
        private router: Router,
        private dialog: MatDialog
    )   {}

    onToggleFavorite(favorited: boolean)  {
       this.recipe['favorited'] = favorited;
      // this.recipe['favoritesCount']=0;
       if(favorited) {
           this.recipe['favoritesCount']++;
       } else {
        this.recipe['favoritesCount']--;
       }
    }

    toggleFavorite() {
        
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
                    this.onToggleFavorite(!this.recipe['favorited']);
                    console.log(this.recipe['favorited']);
                    if(this.recipe['favorited'])  {console.log('FAVVV')
                        return this.recipeService.favorite(this.recipe.slug)
                       
                    } else {console.log('UNNFAVVV')
                        return this.recipeService.unfavorite(this.recipe.slug)
                    } 
                }
               
            })
        ).subscribe();
       // sub.unsubscribe();
        

    }
}


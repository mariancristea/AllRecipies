import { Component, Input } from "@angular/core";
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

    constructor(
        private userService: UserService,
        private recipeService: RecipeService,
        private router: Router,
        private dialog: MatDialog
    )   {}

    onToggleFavorite(favorited: boolean)  {
       this.recipe['favorited'] = favorited;
      // this.recipe['favoritesCount']=0;
       console.log("BBBBB",this.recipe['favoritesCount']);
       if(favorited) {
           console.log(this.recipe['favoritesCount']);
           this.recipe['favoritesCount']++;
       } else {
        this.recipe['favoritesCount']--;
       }
    }

    toggleFavorite(click: boolean) {
        console.log('fav',click)
        click= false;
       var sub = this.userService.isAuthenticated.pipe(first(),
            switchMap(authenticated => {
                console.log('no',this.recipe.title);
                if(!authenticated)  {
                    const dialogRef = this.dialog.open(AuthComponent ,{
                        width: '600px',
                        height: '600px',
                        data: 'login'
                      });
                    return of(null);
                }
                else{
                    console.log('2222');
                    if(!this.recipe.favorited)  { console.log('3333');
                        return this.recipeService.favorite(this.recipe.slug)
                       
                    } else {
                        return this.recipeService.unfavorite(this.recipe.slug)
                    } 
                }
               
            })
        ).subscribe();
       // sub.unsubscribe();
        

    }
}


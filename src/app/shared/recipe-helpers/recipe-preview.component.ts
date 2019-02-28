import { Component, Input } from "@angular/core";
import { Recipe } from 'src/app/core';


@Component({
    selector: 'app-recipe-preview',
    templateUrl: './recipe-preview.component.html'
})

export class RecipePreviewComponent {
    @Input() recipe: Recipe;

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
}


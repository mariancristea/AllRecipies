import { Recipe } from './recipe.model';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })
export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe(
            'Tasty Schnitzel',
            'A super-tasty Schnitzel - just awesome!',
            'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
            5
        ),
        new Recipe( 'Tasty Schnitzel',
        'A super-tasty Schnitzel - just awesome!',
        'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
        4),
        new Recipe( 'Tasty Schnitzel',
        'A super-tasty Schnitzel - just awesome!',
        'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
        4),
        new Recipe( 'Tasty Schnitzel',
        'A super-tasty Schnitzel - just awesome!',
        'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
        4)
    ];

    getRecipies(): Observable<Recipe[]> {
        return of(this.recipes);
    }
}
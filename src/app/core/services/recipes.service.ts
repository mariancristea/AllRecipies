import { Recipe } from '../models/recipe.model';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { RecipeListConfig } from '../models/recipe-list-config.model';
import { HttpParams } from '@angular/common/http';


@Injectable({
    providedIn: 'root',
  })
export class RecipeService {
    constructor(
        private apiService: ApiService
    ) {}

    query(config: RecipeListConfig) : Observable<{recipes: Recipe[], recipesCount: number}>  {
        const params = {};
        
        Object.keys(config.filters)
            .forEach((key) => {
                params[key] = config.filters[key];
            })

        console.log('XXXX',config);
        return this.apiService.get('/recipes');
    }

    get(slug): Observable<Recipe> {
        return this.apiService.get('/recipies' + slug)
                .pipe(map(data => data.recipe));
    }

    favorite(slug): Observable<Recipe> {
        return this.apiService.post('/recipies' + slug + 'favorites');
    }

    unfavorite(slug): Observable<Recipe> {
        return this.apiService.delete('/articles/' + slug + '/favorite');
      }

    save(recipe): Observable<Recipe> {
        console.log('final',recipe);
        return this.apiService.post('/recipes/', {recipe: recipe});
    }
}
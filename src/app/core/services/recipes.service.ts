import { Recipe } from '../models/recipe.model';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { RecipeListConfig } from '../models/recipe-list-config.model';
import { HttpParams } from '@angular/common/http';


@Injectable()
export class RecipeService {
    constructor(
        private apiService: ApiService
    ) {}

    query(config: RecipeListConfig) : Observable<{recipes: Recipe[], recipesCount: number}>  {
        const params = {};
        config.filters.tag=[];
        config.filters.tag.push('asian');
        config.filters.tag.push('italian');
        console.log('Recipe Service', config);
        Object.keys(config.filters)
            .forEach((key) => {
                params[key] = config.filters[key];
            })

       
        return this.apiService.get('/recipes', new HttpParams({ fromObject: params }));
    }

    get(slug): Observable<Recipe> {
        return this.apiService.get('/recipes/' + slug)
                .pipe(map(data => data.recipe));
    }

    favorite(slug): Observable<Recipe> {
        return this.apiService.post('/recipes/' + slug + '/favorites');
    }

    unfavorite(slug): Observable<Recipe> {
        return this.apiService.delete('/recipes/' + slug + '/favorites');
      }

    save(recipe): Observable<Recipe> {
        console.log('final',recipe);
        return this.apiService.post('/recipes/', {recipe: recipe});
    }
}
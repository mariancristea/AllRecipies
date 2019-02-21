import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe, UserService, RecipeService } from '../core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class EditableRecipeResolver implements Resolve<Recipe> {
    constructor(
        private recipeService: RecipeService,
        private router: Router,
        private userService: UserService
    ) { }
    
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return this.recipeService.get(route.params['slug'])
                .pipe(map( recipe => {
                    
                }));
    }
}


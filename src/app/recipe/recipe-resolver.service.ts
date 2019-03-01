import { Injectable } from "@angular/core";
import { RecipeService, UserService, Recipe } from '../core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class RecipeResolver implements Resolve<Recipe>  {
    constructor(
        private recipeService: RecipeService,
        private router: Router,
        private userService: UserService
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        console.log('Resolver test');
        return this.recipeService.get(route.params['slug'])
            .pipe(catchError((err) => this.router.navigateByUrl('/')));
    }
}
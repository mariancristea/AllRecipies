import { Component, Input } from "@angular/core";
import { RecipeService, Recipe, RecipeListConfig } from 'src/app/core';

@Component({
    selector: 'app-list',
    templateUrl: './recipe-list.component.html'
})

export class RecipeList {
    constructor(
        private recipesService: RecipeService
    )   {}

    @Input()
    set config(config: RecipeListConfig) {
        console.log('AA')
        if(config)  {
            this.query = config;
            this.runQuery();
        }
    }
    query: RecipeListConfig;
    results: Recipe[];

    runQuery()  {
        //this.query.filters.limit = 20;
        console.log('Querry1111111111111');
        this.recipesService.query(this.query)
        .subscribe(data => {
            this.results = data.recipes;
            console.log('AHA',this.results);
        });
    }
}
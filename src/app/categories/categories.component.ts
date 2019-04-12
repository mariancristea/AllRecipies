import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { RecipeListConfig, RecipeService, Recipe } from '../core';



@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']

})

export class CategoriesComponent implements OnInit{
    currentCategory: String = '';
    filters: Object = {}
    listConfig: RecipeListConfig = {
        type: 'all',
        search: false,
        filters: {}
      };
    results: Recipe[];
    categories: String[] = ['Asian','italian','ttest1', 'indian'];


    constructor(private route: ActivatedRoute,
                private recipeService: RecipeService) {}

    ngOnInit() {
        this.route.url.subscribe(data => {
            this.currentCategory = data[data.length - 1].path;
            if(this.currentCategory !== 'categories') {
                this.listConfig.filters.tag = [];
                this.listConfig.filters.tag.push(this.currentCategory.toLowerCase() as string);
                this.filters = {tag: this.listConfig.filters.tag}
                this.listConfig = {type: 'all',search: false, filters: this.filters};
                console.log(this.listConfig);
                this.runQuery();
            }
        })
    }
    runQuery()  {
        //this.query.filters.limit = 20;
        console.log("TTT");
        this.recipeService.query(this.listConfig)
        .subscribe(data => {
            console.log('!!!!', data);
            this.results = data.recipes;
            
        });
    }
    
}


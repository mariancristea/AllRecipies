import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { RecipeListConfig } from '../core';



@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html'

})

export class CategoriesComponent implements OnInit{
    currentCategory: String = '';
    filters: Object = {}
    listConfig: RecipeListConfig = {
        type: 'all',
        search: false,
        filters: {}
      };

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.url.subscribe(data => {
            this.currentCategory = data[data.length - 1].path;
            if(this.currentCategory !== 'categories') {
                this.listConfig.filters.tag = [];
                this.listConfig.filters.tag.push(this.currentCategory.toLowerCase() as string);
               
                
                this.filters = {tag: this.listConfig.filters.tag}
                this.listConfig = {type: 'ally',search: false, filters: this.filters};
            }
        })
    }
}
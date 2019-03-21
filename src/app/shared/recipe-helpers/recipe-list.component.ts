import { Component, Input, OnInit } from "@angular/core";
import { RecipeService, Recipe, RecipeListConfig } from 'src/app/core';
import { Observable, observable, Subject } from 'rxjs';
import { SearchService } from 'src/app/core/services/search.service';
import { nextContext } from '@angular/core/src/render3';

@Component({
    selector: 'app-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})

export class RecipeList implements OnInit {
    constructor(
        private recipesService: RecipeService,
        private searchService: SearchService
    )   { }
   
    @Input()
    set config(config: RecipeListConfig) {
        if(config)  {
            this.query = config;
           
            console.log('Recipe-List, Set config',config);
            if(config.search){
               // this.searchService.tags.subscribe(data => console.log('Subscribe',data));
                this.searchService.search(this.searchService.searchTerm$)
                .subscribe(results => {
                    this.results = results.recipes;
                });
            } else this.runQuery();
        }
    }
 
    searchInput: String;

    query: RecipeListConfig;
    results: Recipe[];

    runQuery()  {
        //this.query.filters.limit = 20;
        this.recipesService.query(this.query)
        .subscribe(data => {
            console.log('!!!!',this.results);
            this.results = this.results.concat(data.recipes);
            
        });
    }
    setBackground(){
     // document.getElementById('card').style.backgroundImage = "url('../../../assets/imgs/recepie1.png')";
    }
    ngOnInit(){
        console.log('init');
        this.results = [];
    }
}

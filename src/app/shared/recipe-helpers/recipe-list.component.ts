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
    )   {
        console.log('Recipe-lIST CONSTRUCTOR');
       
    }
   
    @Input()
    set config(config: RecipeListConfig) {
        console.log('AA')
        if(config)  {
            this.query = config;
            this.runQuery();
            if(config.search){
                console.log(config.search);
                this.searchService.search(this.searchService.searchTerm$)
                .subscribe(results => {
                    console.log('!!!',results)
                    this.results = results.recipes;
                });
            }
        }
    }
 
    searchInput: String;

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
    setBackground(){
      document.getElementById('card').style.backgroundImage = "url('../../../assets/imgs/recepie1.png')";
      console.log('background set');
    }
    ngOnInit(){
        
      // this.setBackground();
    }
}

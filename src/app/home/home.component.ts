import { Component, OnInit } from "@angular/core";
import { RecipeListConfig, Categories, RecipeService, Recipe } from '../core';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { SearchService } from '../core/services/search.service';
import { checkAndUpdateDirectiveDynamic } from '@angular/core/src/view/provider';


@Component({
    selector: 'app-home-page',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    listConfig: RecipeListConfig = {
        type: 'all',
        search: true,
        filters: {limit: 8}
      };
    recipeCount: number;
    homeType: String;
    searchParam : String;
    filters: Object = {}
    offset : number = 0;
    showMoreButton : boolean = true;
    results: Recipe[];
    categories = [
        [
            new Categories("Category","asian",false),
            new Categories("Category","Main",false),
            new Categories("Category","Dessert",false),
            new Categories("Category","Breakfast",false),
            new Categories("Category","Snack",false)
        ],
        [
            new Categories("Doi","Chinese",false),
            new Categories("Trei","italian",false)
        ]

    ];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private searchService: SearchService,
        private recipesService: RecipeService
    ) {}
    
    ngOnInit()  {
        this.results = [];
        this.listConfig.filters.tag = [];
        this.route.url.subscribe(data => {
            this.homeType = this.router.url;
            if(this.homeType === '/search') {
                this.listConfig.search = true;
                this.searchService.searchTerm$.next('');
            }
            else this.listConfig.search = false;
            console.log('111');
            this.onChangeListConfig();
        })
    }
    onSearchChange(searchValue : String) {  
       this.searchService.searchTerm$.next(searchValue); 
    }

    onChangeListConfig(fromOnMore = false) {
        console.log('Recipe-List, Set config',this.listConfig);
        if(this.listConfig.search){
            this.searchService.tags.next(this.listConfig);
            this.searchService.search(this.searchService.searchTerm$)
            .subscribe(data => {
                this.offset += data.recipes.length;
                if(data.recipes.length <= 3 || this.offset === data.recipesCount) this.showMoreButton = false;
                if(fromOnMore) this.results = this.results.concat(data.recipes);
                else this.results = data.recipes;
            });
        } else this.runQuery();
    }

    onCheck($event:any, categories, checkedName, index) {
      console.log('oncheck');
       $event.stopPropagation();

       var pos = this.listConfig.filters.tag.indexOf(checkedName.name)
       if(pos > -1) {
           this.listConfig.filters.tag.splice(pos, 1);
       }else this.listConfig.filters.tag.push(checkedName.name as string);

        this.filters = {tag: this.listConfig.filters.tag, limit: 8};
        this.listConfig = {type: 'allx',search: true, filters: this.filters};
        console.log(this.listConfig);
        this.searchService.tags.next(this.listConfig);
        this.onChangeListConfig();
       
    }
    onMore() {
        this.filters = {tag: this.listConfig.filters.tag, offset: this.offset, limit: 3};
        this.listConfig= {type:'all',search:this.listConfig.search, filters:this.filters};
        this.onChangeListConfig(true);
    }

    runQuery()  {
        //this.query.filters.limit = 20;c
        console.log(this.listConfig);
        this.recipesService.query(this.listConfig)
        .subscribe(data => {
            this.offset += data.recipes.length;
            if(data.recipes.length < 3 || this.offset === data.recipesCount) this.showMoreButton = false;
            this.results = this.results.concat(data.recipes);
        });
    }
}


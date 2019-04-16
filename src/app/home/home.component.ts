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
        filters: {limit:4}
      };
    homeType: String;
    filters: Object = {}
    showMoreButton : boolean = true;
    results: Recipe[];
    categories = [
        [
            new Categories("Starter",false),
            new Categories("Main",false),
            new Categories("Dessert",false),
            new Categories("Breakfast",false),
            new Categories("Snack",false)
        ],
        [
            new Categories("Beef",false),
            new Categories("Pasta",false),
            new Categories("Poultry",false),
            new Categories("Pork",false),
        ],
        [
            new Categories("Chinese",false),
            new Categories("Indian",false),
            new Categories("Italian",false),
            new Categories("Spanish",false),
            new Categories("American",false),
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
                this.searchService.tags.next(this.listConfig);
                this.searchService.searchTerm$.next('');
                this.searchService.search(this.searchService.searchTerm$)
                .subscribe(data => {
                    console.log('data');
                    this.results = data.recipes;
                });
            }
            else {
                this.listConfig.search = false;
                this.runQuery();
            }
        })
    }
    onSearchChange(searchValue : String) { 
       this.listConfig.filters.offset = 0; 
       this.showMoreButton = true;
       this.searchService.tags.next(this.listConfig);
       this.searchService.searchTerm$.next(searchValue); 
    }


    onCheck($event:any, categories, checkedName, index) {
        console.log('oncheck');
        $event.stopPropagation();

        var pos = this.listConfig.filters.tag.indexOf((checkedName.name as string).toLowerCase())
        if(pos > -1) this.listConfig.filters.tag.splice(pos, 1);
            else this.listConfig.filters.tag.push((checkedName.name as string).toLowerCase());

        this.results = [];
        this.filters = {tag: this.listConfig.filters.tag, limit: 4, offset: 0};
        this.listConfig = {type: 'allx',search: true, filters: this.filters};
        if(this.listConfig.search) this.runQuerySearch();
            else this.runQuery();
        console.log(this.filters);
    }

    onMore() {
        this.filters = {tag: this.listConfig.filters.tag, offset: this.results.length, limit: 4};
        this.listConfig= {type:'all', search:this.listConfig.search, filters: this.filters};
        if(this.listConfig.search) this.runQuerySearch();
            else this.runQuery();
    }

    runQuery()  {
        //this.query.filters.limit = 20;c
        console.log(this.listConfig);
        this.recipesService.query(this.listConfig)
        .subscribe(data => {
            this.results = this.results.concat(data.recipes);
            if(data.recipes.length < 4 || this.results.length === data.recipesCount) this.showMoreButton = false;
                else this.showMoreButton = true;
        });
    }

    runQuerySearch() {
        this.searchService.tags.next(this.listConfig);
        this.searchService.searchEntries(this.searchService.searchTerm$.getValue())
        .subscribe(data =>{
            console.log(data.recipes);
            this.results = this.results.concat(data.recipes);
            if(data.recipes.length < 4 || this.results.length === data.recipesCount) this.showMoreButton = false;
                else this.showMoreButton = true;
        });
    }
}


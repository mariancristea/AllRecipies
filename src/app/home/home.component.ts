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
            new Categories("under 20 min.",false, 20),
            new Categories("under 30 min.",false, 30),
            new Categories("under 60 min.",false, 60),
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


    onCheck($event:any, categoryIndex, checkedName, index) {
        console.log(checkedName);
        $event.stopPropagation();
        this.results = [];
        if(categoryIndex === 1) {
            for(var i = 0; i < this.categories[categoryIndex].length; i++) {
                if(index != i) this.categories[categoryIndex][i].checked = false;
            }
            console.log(checkedName.checked);
            if(checkedName.checked === false){console.log('bra 1'); this.listConfig.filters.underTime = this.categories[categoryIndex][index].value;}
            else {console.log('bra2');delete this.listConfig.filters.underTime}
        }
        else{
            var pos = this.listConfig.filters.tag.indexOf((checkedName.name as string).toLowerCase())
            if(pos > -1) this.listConfig.filters.tag.splice(pos, 1);
                else this.listConfig.filters.tag.push((checkedName.name as string).toLowerCase());

           
            console.log(this.filters);
        }
        if(this.listConfig.search) this.runQuerySearch();
            else this.runQuery();
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
            console.log('aa',data.recipes);
            this.results = this.results.concat(data.recipes);
            if(data.recipes.length < 4 || this.results.length === data.recipesCount) this.showMoreButton = false;
                else this.showMoreButton = true;
        });
    }

    runQuerySearch() {
        console.log('!!!!',this.listConfig.filters);
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


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
    homeType: String;
    searchParam : String;
    filters: Object = {}
    offset : number = 0;
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

    onChangeListConfig() {
        console.log('Recipe-List, Set config',this.listConfig);
        if(this.listConfig.search){
            // this.searchService.tags.subscribe(data => console.log('Subscribe',data));
            this.searchService.search(this.searchService.searchTerm$)
            .subscribe(results => {
                this.results = results.recipes;
            });
        } else this.runQuery();
    }

    onCheck($event:any, categories, checkedName, index) {
      
       $event.stopPropagation();
     // categories[checkedName].checked = $event.checked;
      
      console.log(checkedName, pos);
       var pos = this.listConfig.filters.tag.indexOf(checkedName.name)
       if(pos > -1) {
           this.listConfig.filters.tag.splice(pos, 1);
           console.log('!!!!',this.listConfig.filters.tag);
       }else this.listConfig.filters.tag.push(checkedName.name as string);
       //this.filters = this.listConfig.filters.tag;
      // console.log(this.listConfig);
        this.filters = {tag: this.listConfig.filters.tag, limit: 0};
        this.listConfig = {type: 'allx',search: true, filters: this.filters};
        console.log(this.listConfig);
        this.searchService.tags.next(this.listConfig);
        this.onChangeListConfig();
       
    }
    onMore() {
        console.log('more');
        this.offset = this.offset + 1;
        this.filters = {tag: this.listConfig.filters.tag, offset: this.offset, limit: 8};
        this.listConfig= {type:'all',search:false,filters:this.filters};
        this.runQuery();
    }

    runQuery()  {
        //this.query.filters.limit = 20;
        this.recipesService.query(this.listConfig)
        .subscribe(data => {
            console.log('!!!!',data.recipesCount);
            this.results = this.results.concat(data.recipes);
            
        });
    }
}


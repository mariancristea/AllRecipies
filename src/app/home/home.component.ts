import { Component, OnInit } from "@angular/core";
import { RecipeListConfig, Categories } from '../core';
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
        filters: {}
      };
    homeType: String;
    searchParam : String;
    filters: Object = {}
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
    checked = {
        starter1: 'false',
        starter2: 'false'
    }

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private searchService: SearchService
    ) {}
    
    ngOnInit()  {
        this.listConfig.filters.tag = [];
        this.route.url.subscribe(data => {
            this.homeType = this.router.url;
            if(this.homeType === '/search') {
                this.listConfig.search = true;
                this.searchService.searchTerm$.next('');
            }
            else this.listConfig.search = false;

        })
    }
    onSearchChange(searchValue : String) {  
       this.searchService.searchTerm$.next(searchValue);
      
    }

    onChangeListConfig() {

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
        this.filters = {tag: this.listConfig.filters.tag};
        this.listConfig = {type: 'allx',search: true, filters: this.filters};
 
       this.searchService.tags.next(this.listConfig);
       
    }
    
}


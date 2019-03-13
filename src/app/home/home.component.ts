import { Component, OnInit } from "@angular/core";
import { RecipeListConfig } from '../core';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { SearchService } from '../core/services/search.service';


@Component({
    selector: 'app-home-page',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    listConfig: RecipeListConfig = {
        type: 'all',
        search: false,
        filters: {}
      };
    homeType: String;
    searchParam : String;
    filters: Object = {}

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private searchService: SearchService
    ) {}
    
    ngOnInit()  {
        this.route.url.subscribe(data => {
            console.log('TEEEEEEEEEE',this.router.url)
            this.homeType = this.router.url;
            if(this.homeType === '/search') {
                this.listConfig.search = true;
                this.searchService.searchTerm$.next('');
                this.filters = {tag: 'asian'};
                this.listConfig = {type: 'all',search: true, filters: this.filters};
                this.searchService.tags.next(this.listConfig);
            }

        })
    }
    onSearchChange(searchValue : String) {  
        console.log('TRiGGGERR !!!!!!!!!!!!!!!!!!!!!!!!');
       this.searchService.searchTerm$.next(searchValue);
    }

    onChangeListConfig() {

    }
    
}


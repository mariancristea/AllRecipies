import { Component, OnInit } from '@angular/core';
import { RecipeListConfig, Categories, RecipeService, Recipe } from '../core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../core/services/search.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    listConfig: RecipeListConfig = {
        type: 'all',
        search: true,
        filters: {limit: 4}
      };
    homeType: String;
    filters: Object = {};
    showMoreButton = true;
    results: Recipe[];
    showNothingFound: boolean = false;
    categories = [
        [
            new Categories('Starter', false),
            new Categories('Main', false),
            new Categories('Dessert', false),
            new Categories('Breakfast', false),
            new Categories('Snack', false)
        ],
        [
            new Categories('under 20 min.', false, 20),
            new Categories('under 30 min.', false, 30),
            new Categories('under 60 min.', false, 60),
        ],
        [
            new Categories('Chinese', false),
            new Categories('Indian', false),
            new Categories('Italian', false),
            new Categories('Spanish', false),
            new Categories('American', false),
            new Categories('European', false),
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
        this.route.url.subscribe(() => {
            this.homeType = this.router.url;
            if (this.homeType === '/search') {
                this.listConfig.search = true;
                this.searchService.tags.next(this.listConfig);
                this.searchService.searchTerm$.next('');
                this.searchService.search(this.searchService.searchTerm$)
                .subscribe(list => {
                  this.results = list.recipes;
                  if (list.recipes.length < 4 || this.results.length === list.recipesCount) {
                    this.showMoreButton = false; }
                  if (this.results.length === 0) { this.showNothingFound = true; }
                });
            } else {
                this.listConfig.search = false;
                this.runQuery();
            }
        });
    }
    onSearchChange(searchValue: String) {
       this.listConfig.filters.offset = 0;
       this.showNothingFound = false;
       this.showMoreButton = true;
       this.searchService.tags.next(this.listConfig);
       this.searchService.searchTerm$.next(searchValue);
    }


    onCheck($event: any, categoryIndex, checkedName, index) {
        $event.stopPropagation();
        this.showNothingFound = false;
        this.listConfig.filters.offset = 0;
        this.results = [];
        if (categoryIndex === 1) {
            for (let i = 0; i < this.categories[categoryIndex].length; i++) {
                if (index !== i) { this.categories[categoryIndex][i].checked = false; }
            }
            if (checkedName.checked === false) {
               this.listConfig.filters.underTime = this.categories[categoryIndex][index].value;
            } else { delete this.listConfig.filters.underTime; }
        } else {
            const pos = this.listConfig.filters.tag.indexOf((checkedName.name as string).toLowerCase());
            if (pos > -1) {
              this.listConfig.filters.tag.splice(pos, 1);
            } else { this.listConfig.filters.tag.push((checkedName.name as string).toLowerCase()); }
        }

        if (this.listConfig.search) {
          this.runQuerySearch();
        } else { this.runQuery(); }
    }

    onMore() {
        this.filters = {tag: this.listConfig.filters.tag, offset: this.results.length, limit: 4};
        this.listConfig = {type: 'all', search: this.listConfig.search, filters: this.filters};
        if (this.listConfig.search) { this.runQuerySearch(); } else { this.runQuery(); }
    }

    runQuery()  {
        this.recipesService.query(this.listConfig)
        .subscribe(data => {
            this.results = this.results.concat(data.recipes);
            if (data.recipes.length < 4 || this.results.length === data.recipesCount) {
              this.showMoreButton = false; }
            else { this.showMoreButton = true; }
        });
    }

    runQuerySearch() {
        this.searchService.tags.next(this.listConfig);

        this.searchService.searchEntries(this.searchService.searchTerm$.getValue())
        .subscribe(data => {
            this.results = this.results.concat(data.recipes);
            if (this.results.length === 0) { this.showNothingFound = true; }
            if (data.recipes.length < 4 || this.results.length === data.recipesCount) {
              this.showMoreButton = false; }
            else { this.showMoreButton = true; }
        });
    }
}


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeListConfig, RecipeService, Recipe } from '../core';



@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']

})

export class CategoriesComponent implements OnInit {
    currentCategory: String = '';
    filters: Object = {};
    listConfig: RecipeListConfig = {
        type: 'all',
        search: false,
        filters: {}
      };
    results: Recipe[];
    categories: object[] = [
        {
            title: 'Chinese',
            image: 'https://images.kitchenstories.io/wagtailOriginalImages/RP16_04_132_3x4/RP16_04_132_3x4-small-portrait-150.jpg'
        },
        {
            title: 'American',
            image: 'https://images.kitchenstories.io/wagtailOriginalImages/American/American-small-portrait-150.jpg'
        },
        {
            title: 'Breakfast',
            image: 'https://images.kitchenstories.io/featuredSearchImages/breakfast_and_brunch_f8624b76/breakfast_and_brunch_f8624b76-small-portrait-150.jpg'
        },
        {
            title: 'European',
            image: 'https://images.kitchenstories.io/wagtailOriginalImages/European/European-small-portrait-150.jpg'
        },
        {
            title: 'Dessert',
            image: 'https://images.kitchenstories.io/wagtailOriginalImages/Dessert/Dessert-small-portrait-150.jpg'
        },
        {
            title: 'French',
            image: 'https://images.kitchenstories.io/wagtailOriginalImages/french_new/french_new-small-portrait-150.jpg'
        },
        {
            title: 'German',
            image: 'https://images.kitchenstories.io/wagtailOriginalImages/German/German-small-portrait-150.jpg'
        },
        {
            title: 'Indian',
            image: 'https://images.kitchenstories.io/wagtailOriginalImages/Indian/Indian-small-portrait-150.jpg'
        },
        {
            title: 'Italian',
            image: 'https://images.kitchenstories.io/wagtailOriginalImages/Italian/Italian-small-portrait-150.jpg'
        },
        {
            title: 'Main',
            image: 'https://images.kitchenstories.io/wagtailOriginalImages/maincourse_new/maincourse_new-small-portrait-150.jpg'
        }];


    constructor(private route: ActivatedRoute,
                private recipeService: RecipeService) {}

    ngOnInit() {
        this.route.url.subscribe(data => {
            this.currentCategory = data[data.length - 1].path;
            if (this.currentCategory !== 'categories') {
                this.listConfig.filters.tag = [];
                this.listConfig.filters.tag.push(this.currentCategory.toLowerCase() as string);
                this.filters = {tag: this.listConfig.filters.tag};
                this.listConfig = {type: 'all', search: false, filters: this.filters};
                this.runQuery();
            }
        });
    }
    runQuery()  {
        this.recipeService.query(this.listConfig)
        .subscribe(data => {
            this.results = data.recipes;
        });
    }
}


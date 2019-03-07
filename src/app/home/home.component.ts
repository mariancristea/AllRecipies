import { Component } from "@angular/core";
import { RecipeListConfig } from '../core';


@Component({
    selector: 'app-home-page',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent {
    listConfig: RecipeListConfig = {
        type: 'all',
        filters: {}
      };
}


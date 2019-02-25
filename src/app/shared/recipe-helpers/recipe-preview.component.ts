import { Component, Input } from "@angular/core";
import { Recipe } from 'src/app/core';


@Component({
    selector: 'app-recipe-preview',
    templateUrl: './recipe-preview.component.html'
})

export class RecipePreviewComponent {
    @Input() recipe: Recipe;
}
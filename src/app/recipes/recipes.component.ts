import { Component, OnInit } from '@angular/core';
import { RecipeService, Recipe } from '../core';


@Component({
  selector: 'app-recipies',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[];

  constructor(private recipesService: RecipeService) {}

  ngOnInit() {
    console.log(this.recipes);
    
  }


}


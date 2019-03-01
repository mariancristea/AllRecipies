import { Component, OnInit } from '@angular/core';
import { RecipeService, Recipe } from '../core';


@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  recipes: Recipe[];

  constructor(private recipesService: RecipeService) {}

  ngOnInit() {
  
    
  }


}


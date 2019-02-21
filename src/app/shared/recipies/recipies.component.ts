import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../core/services/recipes.service';
import { Recipe } from '../../core/models/recipe.model';


@Component({
  selector: 'app-recipies',
  templateUrl: './recipies.component.html',
  styleUrls: ['./recipies.component.css']
})
export class RecipiesComponent implements OnInit {
  recipies: Recipe[];

  constructor(private recipiesService: RecipeService) {}

  ngOnInit() {
    console.log(this.recipies);
    
  }


}


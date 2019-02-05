import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipes.service';
import { Recipe } from './recipe.model';


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
    this.getHereos();
  }

  getHereos(): void {
    this.recipiesService.getRecipies()
    .subscribe(recipies => this.recipies = recipies.slice())
    console.log(this.recipies);
  }
}


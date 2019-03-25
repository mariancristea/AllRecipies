import { Component, OnInit } from '@angular/core';
import { RecipeService, Recipe } from '../core';


@Component({
  selector: 'app-recipies',
  templateUrl: './recipies.component.html',
  styleUrls: ['./recipies.component.css']
})
export class RecipiesComponent implements OnInit {
  recipies: Recipe[];

  constructor(private recipiesService: RecipeService) {}

  ngOnInit() {
    this.recipiesService.get('test');
    console.log(this.recipies);
    
  }


}


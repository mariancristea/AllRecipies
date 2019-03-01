import { Component, OnInit } from '@angular/core';
import { RecipeService, Recipe, UserService, User } from '../core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  currentUser: User;
  recipe: Recipe;
  comments: Comment[];
  commentControl = new FormControl();

  constructor(
    private recipesService: RecipeService,
    private route: ActivatedRoute,
    private userService: UserService
    ) {}

  ngOnInit() {
    this.route.data.subscribe(
      (data: { recipe: Recipe }) => {
        this.recipe = data.recipe;
      }
    )

    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;
      }
    )
  }

  addComment() {
    console.log('TEST COMMENT',this.commentControl.value);
    const commentBody = this.commentControl.value;

  }


}


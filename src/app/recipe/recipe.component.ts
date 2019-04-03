import { Component, OnInit } from '@angular/core';
import { RecipeService, Recipe, UserService, User, CommentsService, RecipeListConfig } from '../core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  currentUser: User;
  author: User;
  recipe: Recipe;
  comments: Comment[];
  commentControl = new FormControl();

  results: Recipe[];
  listConfig: RecipeListConfig = {
    type: 'all',
    search: false,
    filters: {'limit': 3}
  };

  constructor(
    private recipesService: RecipeService,
    private route: ActivatedRoute,
    private userService: UserService,
    private commentsService: CommentsService
    ) {}

  ngOnInit() {
    this.runQuery();
    this.route.data.subscribe(
      (data: { recipe: Recipe }) => {
        this.recipe = data.recipe;

        this.populateComments();
      }
    )
    console.log('RECIPE',this.recipe.author)

    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;
      }
    )
  }

  populateComments(){
    this.commentsService.getAll(this.recipe.slug)
        .subscribe(comments => {
        })
  }


  addComment() {
    const commentBody = this.commentControl.value;

    this.commentsService
      .add(this.recipe.slug, commentBody)
      .subscribe(data =>
        {
        })
   }

   runQuery()  {
    //this.query.filters.limit = 20;
    console.log("TTT");
    this.recipesService.query(this.listConfig)
    .subscribe(data => {
        console.log('!!!!',this.results);
        this.results = data.recipes;
        
    });
}


}


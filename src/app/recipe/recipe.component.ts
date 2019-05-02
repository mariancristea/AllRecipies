import { Component, OnInit } from '@angular/core';
import { RecipeService, Recipe, UserService, User, CommentsService, RecipeListConfig, Comment } from '../core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthComponent } from '../auth/auth.component';
import { MatDialog } from '@angular/material';



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
  suggestions: Recipe[];
  listConfig: RecipeListConfig = {
    type: 'all',
    search: false,
    filters: {'limit': 3}
  };
  listConfig2: RecipeListConfig = {
    type: 'all',
    search: false,
    filters: {'limit': 8}
  };

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private userService: UserService,
    private commentsService: CommentsService,
    ) {}

  ngOnInit() {
    this.comments = [];

    this.runQuery();
    this.route.data.subscribe(
      (data: { recipe: Recipe }) => {
        this.recipe = data.recipe;
        window.scroll(0, 0);
        this.populateComments();
      }
    );
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;
      }
    );
  }

  populateComments(){
    this.commentsService.getAll(this.recipe.slug)
        .subscribe(comments => this.comments = comments);
  }


  addComment() {
    const commentBody = this.commentControl.value;

    this.commentsService
      .add(this.recipe.slug, commentBody)
      .subscribe(
        comment => {
          this.comments.unshift(comment);
          this.commentControl.reset('');
        }
      );
   }

   runQuery()  {
    this.recipeService.query(this.listConfig)
    .subscribe(data => {
        this.results = data.recipes;
    });
    this.recipeService.query(this.listConfig2)
    .subscribe(data => {
        this.suggestions = data.recipes;
    });
}

  onToggleFavorite(favorited: boolean)  {
    this.recipe['favorited'] = favorited;
    if (favorited) {
        this.recipe['favoritesCount']++;
    } else {
    this.recipe['favoritesCount']--;
    }
  }
  toggleFavorite() {
    this.onToggleFavorite(!this.recipe['favorited']);
    if (this.recipe['favorited'])  {
          this.recipeService.favorite(this.recipe.slug).subscribe();
    } else {
          this.recipeService.unfavorite(this.recipe.slug).subscribe();
    }

  }
  openAuthDialog(authType: string): void {
    this.userService.openAuthDialog(authType);
  }

}



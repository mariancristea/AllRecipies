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
    private dialog: MatDialog
    ) {}

  ngOnInit() {
    this.comments = [];
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
        .subscribe(comments => this.comments = comments)
  }


  addComment() {
    const commentBody = this.commentControl.value;

    this.commentsService
      .add(this.recipe.slug, commentBody)
      .subscribe(
        comment => {
          this.comments.unshift(comment);
          this.commentControl.reset('');
        //  this.isSubmitting = false;
        }
      );
   }

   runQuery()  {
    //this.query.filters.limit = 20;
    console.log("TTT");
    this.recipeService.query(this.listConfig)
    .subscribe(data => {
        console.log('!!!!',this.results);
        this.results = data.recipes;
    });
    this.recipeService.query(this.listConfig2)
    .subscribe(data => {
        console.log('!!!!',this.results);
        this.suggestions = data.recipes;
    });
}

onToggleFavorite(favorited: boolean)  {
  this.recipe['favorited'] = favorited;
 // this.recipe['favoritesCount']=0;
  if(favorited) {
      this.recipe['favoritesCount']++;
  } else {
   this.recipe['favoritesCount']--;
  }
}
  toggleFavorite() {
    this.onToggleFavorite(!this.recipe['favorited']);
    if(this.recipe['favorited'])  {
        console.log('FAVVV')
         this.recipeService.favorite(this.recipe.slug).subscribe();
    } else {
        console.log('UNNFAVVV')
         this.recipeService.unfavorite(this.recipe.slug).subscribe();
    } 

}
openAuthDialog(authType: string) : void {
  this.userService.openAuthDialog(authType);
}

}



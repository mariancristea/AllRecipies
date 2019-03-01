import { Component, OnInit } from '@angular/core';
import { RecipeService, Recipe, UserService, User, CommentsService } from '../core';
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
    private userService: UserService,
    private commentsService: CommentsService
    ) {}

  ngOnInit() {
    this.route.data.subscribe(
      (data: { recipe: Recipe }) => {
        console.log('Recipe:', data)
        this.recipe = data.recipe;

        this.populateComments();
      }
    )

    this.userService.currentUser.subscribe(
      (userData: User) => {
        console.log('User:', userData)
        this.currentUser = userData;
      }
    )
  }

  populateComments(){
    console.log('Populate');
    this.commentsService.getAll(this.recipe.slug)
        .subscribe(comments => {
          console.log('COMM get',comments);
        })
  }


  addComment() {
    console.log('TEST COMMENT',this.commentControl.value);
    const commentBody = this.commentControl.value;

    this.commentsService
      .add(this.recipe.slug, commentBody)
      .subscribe(data =>
        {
          console.log('Test Comment 2',data)
        })


   }


}


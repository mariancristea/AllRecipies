import { Component, Input } from "@angular/core";
import { Comment } from 'src/app/core';


@Component({
    selector: 'app-recipe-comment',
    templateUrl: './recipe-comment.component.html',
    styleUrls: ['./recipe-comment.component.css']
})

export class RecipeCommentComponent {
    @Input() comment: Comment;
}

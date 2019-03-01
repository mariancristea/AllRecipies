import { Component, Input } from "@angular/core";


@Component({
    selector: 'app-recipe-comment',
    templateUrl: './recipe-comment.component.html'
})

export class RecipeCommentComponent {
    @Input() comment: Comment;
}
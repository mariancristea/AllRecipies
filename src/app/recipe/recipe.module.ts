import { NgModule } from "@angular/core";
import { SharedModule } from '../shared';
import { RecipeComponent } from './recipe.component';
import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeCommentComponent } from './recipe comment/recipe-comment.component';


@NgModule({
    imports: [
        SharedModule,
        RecipeRoutingModule
    ],
    declarations: [
        RecipeComponent,
        RecipeCommentComponent
    ]

})

export class RecipeModule {}
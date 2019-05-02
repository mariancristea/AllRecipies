import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { RecipeComponent } from './recipe.component';
import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeCommentComponent } from './recipe comment/recipe-comment.component';
import { RecipeResolver } from './recipe-resolver.service';


@NgModule({
    imports: [
        SharedModule,
        RecipeRoutingModule
    ],
    declarations: [
        RecipeComponent,
        RecipeCommentComponent
    ],
    providers: [
        RecipeResolver
    ]

})

export class RecipeModule {}

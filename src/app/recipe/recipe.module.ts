import { NgModule } from "@angular/core";
import { SharedModule } from '../shared';
import { RecipeComponent } from './recipe.component';
import { RecipeRoutingModule } from './recipe-routing.module';


@NgModule({
    imports: [
        SharedModule,
        RecipeRoutingModule
    ],
    declarations: [
        RecipeComponent
    ]

})

export class RecipeModule {}
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { RecipeComponent } from './recipe.component';
import { RecipeResolver } from './recipe-resolver.service';

const routes: Routes = [
    {
        path: ':slug',
        component: RecipeComponent,
        resolve: {
            recipe: RecipeResolver
        }
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RecipeRoutingModule {}
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { RecipeComponent } from './recipe.component';

const routes: Routes = [
    {
        path: ':slug', component: RecipeComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RecipeRoutingModule {}
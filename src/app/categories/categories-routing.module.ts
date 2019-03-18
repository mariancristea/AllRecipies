import { Routes, RouterModule } from "@angular/router";
import { CategoriesComponent } from './categories.component';
import { NgModule } from '@angular/core';



const routes: Routes = [
    {
        path: 'categories',
        component: CategoriesComponent
    },
    {
        path: 'categories/:category',
        component: CategoriesComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CategoriesRoutingModule {}
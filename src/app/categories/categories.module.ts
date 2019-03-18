import { NgModule } from "@angular/core";
import { SharedModule } from '../shared';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';



@NgModule({
    imports: [
        SharedModule,
        CategoriesRoutingModule
    ],
    declarations: [
        CategoriesComponent
    ]
})

export class CategoriesModule {};
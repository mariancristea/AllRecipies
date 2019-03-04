import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ListErrorsComponent } from './list-errors.component';
import { ShowAuthedDirective } from './show-authed.directive';
import { RecipeList, RecipePreviewComponent } from './recipe-helpers';
import { FavoriteButtonComponent } from './buttons';
import { MaterialModule } from '../material.module';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        MaterialModule
    ],
    declarations: [
        ListErrorsComponent,
        ShowAuthedDirective,
        RecipeList,
        RecipePreviewComponent,
        FavoriteButtonComponent

    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        ListErrorsComponent,
        ShowAuthedDirective,
        RecipeList,
        RecipePreviewComponent,
        FavoriteButtonComponent,
        MaterialModule
    ]

})
export class SharedModule {}
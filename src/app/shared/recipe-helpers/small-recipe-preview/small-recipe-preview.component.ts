import { Component, Input } from "@angular/core";
import { Recipe, UserService, RecipeService } from 'src/app/core';
import { switchMap, first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AuthComponent } from 'src/app/auth/auth.component';
import { of } from 'rxjs';


@Component({
    selector: 'app-small-recipe-preview',
    templateUrl: './small-recipe-preview.component.html',
    styleUrls: ['./small-recipe-preview.component.css']
})

export class SmallRecipePreviewComponent {
    @Input() recipe: Recipe;



}


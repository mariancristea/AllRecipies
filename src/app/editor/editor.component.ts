import { Component, OnInit } from "@angular/core";
import { Recipe } from '../core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RecipeService } from '../core/services/recipes.service';



@Component({
    selector: 'editor-page',
    templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {
    recipe: Recipe = {} as Recipe;
    recipeForm: FormGroup;
    isSubmitting : boolean = false;

    constructor(
        private recipeService: RecipeService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder
    ) {
        this.recipeForm = this.fb.group({
            'title': [''],
            'description': [''],
            'body':[ '']
        });

      }  
    
    
    ngOnInit() {
        
    }

    submitForm() {
        this.isSubmitting = true;
        Object.assign(this.recipe, this.recipeForm.value);
        this.recipeService
            .save(this.recipe)
            .subscribe(recipe => this.router.navigateByUrl('/recipe/' + recipe.slug));
    }
   
    updateRecipe(values: Object) {

    }
}
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
            'image': [''],
            'description': [''],
            'prep-time': [''],
            'cook-time': [''],
            'servings': [''],
            'ingredients': ['']
        });

      }  
    
    
    ngOnInit() {
        
    }

    submitForm() {
        this.isSubmitting = true;
        console.log(this.recipeForm.value[0]);
        for (const [key, value] of Object.entries(this.recipeForm.value)) {
            if(key != 'ingredients') this.recipe[key] = value;
          }
        var x = this.recipeForm.value.ingredients;
        var y = x.split('\n');
        console.log(Object.keys(y).length);
        this.recipe.tagList = [];
        for(var i = 0; i < Object.keys(y).length; i++) {
            this.recipe.tagList.push(y[i]);
        }
        
       
        this.recipeService
            .save(this.recipe)
            .subscribe(recipe => this.router.navigateByUrl('/recipe/' + recipe.slug));
    }
   
    updateRecipe(values: Object) {

    }
}
import { Component, OnInit } from "@angular/core";
import { Recipe } from '../core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RecipeService } from '../core/services/recipes.service';



@Component({
    selector: 'editor-page',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
    recipe: Recipe = {} as Recipe;
    recipeForm: FormGroup;
    isSubmitting : boolean = false;
    categoryFormControl = new FormControl('', Validators.required);
    cuisineFormControl = new FormControl('', Validators.required);

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
            'ingredients': [''],
        });

      }  
    
    
    ngOnInit() {
        
    }

    submitForm() {
        this.isSubmitting = true;
        
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
        this.recipe.tagList.push(this.categoryFormControl.value);
        this.recipe.tagList.push(this.cuisineFormControl.value);
       
        this.recipeService
            .save(this.recipe)
            .subscribe(recipe => this.router.navigateByUrl('/recipe/' + recipe.slug));
    }
   
    updateRecipe(values: Object) {

    }
}
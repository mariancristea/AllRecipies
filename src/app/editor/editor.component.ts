import { Component, OnInit } from "@angular/core";
import { Recipe } from '../core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RecipeService } from '../core/services/recipes.service';
import { forEach } from '@angular/router/src/utils/collection';



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
            'title': ['', Validators.required],
            'image': [''],
            'description': [''],
            'time': [''],
            'servings': [''],
            'ingredients': [''],
            'steps': [''],
            'category': ['', Validators.required],
            'cuisine': ['', Validators.required]
        });

      }  
    
    
    ngOnInit() {
        
    }

    submitForm() {
        if(this.recipeForm.valid)
        {
            this.isSubmitting = true;
            console.log(this.recipeForm.value.steps);
            this.recipe.tagList = [];
            this.recipe.ingredients = [];
            this.recipe.steps = [];
            for (const [key, value] of Object.entries(this.recipeForm.value)) {
                console.log(key);
                if(key != 'ingredients' && key != 'steps') this.recipe[key] = value;
                else {
                    console.log(key, this.recipeForm.value[key]);
                    var splitIngredients = this.recipeForm.value[key].split('\n');
                    console.log(splitIngredients);
                    
                    for (var i = 0; i < Object.keys(splitIngredients).length; i++) {
                        this.recipe[key].push(splitIngredients[i]);
                    } 
                }
              }

            this.recipe.tagList.push(this.recipeForm.value.category);
            this.recipe.tagList.push(this.recipeForm.value.cuisine);
           console.log(this.recipe);
            this.recipeService
                .save(this.recipe)
                .subscribe();
            this.router.navigateByUrl('/');
        }
       
    }
   
    updateRecipe(values: Object) {

    }
}
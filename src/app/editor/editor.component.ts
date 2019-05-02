import { Component, OnInit } from '@angular/core';
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
    isSubmitting = false;
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
            'difficulty': [''],
            'ingredients': [''],
            'steps': [''],
            'category': ['', Validators.required],
            'cuisine': ['']
        });

      }


    ngOnInit() {

    }

    submitForm() {
        if (this.recipeForm.valid) {
            this.isSubmitting = true;
            this.recipe.tagList = [];
            this.recipe.ingredients = [];
            this.recipe.steps = [];
            for (const [key, value] of Object.entries(this.recipeForm.value)) {
                if (key !== 'ingredients' && key !== 'steps') { this.recipe[key] = value; } else {
                    const splitIngredients = this.recipeForm.value[key].split('\n');

                    for (let i = 0; i < Object.keys(splitIngredients).length; i++) {
                        this.recipe[key].push(splitIngredients[i]);
                    }
                }
              }
            this.recipe.tagList.push(this.recipeForm.value.category);
            this.recipe.tagList.push(this.recipeForm.value.cuisine);
            this.recipeService
                .save(this.recipe)
                .subscribe();
            this.router.navigateByUrl('/');
        }
    }
}

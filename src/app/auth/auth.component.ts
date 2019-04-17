import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService, Errors } from '../core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HeaderComponent } from '../navigation/header/header.component';
import { TouchSequence } from 'selenium-webdriver';
import { FavoriteButtonComponent } from '../shared/buttons';
import { RecipeCommentComponent } from '../recipe/recipe comment/recipe-comment.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  hide = true;
  authForm : FormGroup;
  authType : String;
  title: String;
  isSubmitting = false;
  errors: Errors = {error: {}};
  navigated : boolean = false;

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private fb : FormBuilder,
    private userService : UserService,
    public dialogRef: MatDialogRef<HeaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data
    ) 
    { 
    this.authForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['']
    });
  }

  ngOnInit() {
    this.authType = this.data;
    console.log('!ss!',this.authType);
    this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
    if (this.authType === 'register') {
      this.authForm.addControl('username' as string, new FormControl());
    }

    let listener = window.addEventListener('message', (message) => {


       var sub = this.userService.isAuthenticated.subscribe((authenticated) => {
          if(!authenticated){
            console.log('MERRRRGEEE');
            return this.userService
            .setAuth(message.data);
          }
        })
        sub.unsubscribe();

      
    });
  }
  getErrorMessage() {
    return this.authForm.hasError('required') ? 'You must enter a value' :
        this.authForm.hasError('email') ? 'Not a valid email' :
            '';
  }

  submitForm() {
    console.log(this.authType)
    this.isSubmitting = true;
    this.errors ={error : {}};
    this.userService
      .attemptAuth(this.authType, this.authForm.value)
      .subscribe(
        data => {
          this.dialogRef.close();
          return null;
      }, err => {
        if(err.status == 422)
        {
          const validationErrors = err.error.errors;
          console.log(validationErrors);
          Object.keys(validationErrors).forEach(prop => {
            prop = 'email';
            const formControl = this.authForm.get(prop);
            if (formControl) {
              console.log(prop);
              formControl.setErrors({
                serverError: validationErrors[prop]
              });
            }
          })
          console.log('ssdd',err);
        }
      });
    
  }
  changeAuthType() {
    this.authType = (this.authType === 'register') ? 'login' : 'register'
    this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
    if (this.authType === 'register') {
      this.authForm.addControl('username' as string, new FormControl());
    }
    else this.authForm.removeControl('username');
  
  }

  OnNavigate() {
    window.open("http://localhost:3000/users/facebook","mywindow","location=1,status=1,scrollbars=1, width=800,height=800");
    console.log('navigate');

    this.dialogRef.close();
    this.navigated = true;
  }
}
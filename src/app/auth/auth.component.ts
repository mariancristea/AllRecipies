import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective, NgForm} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService, Errors } from '../core';
import { MatDialogRef, MAT_DIALOG_DATA, ErrorStateMatcher } from '@angular/material';
import { HeaderComponent } from '../navigation/header/header.component';
import { TouchSequence } from 'selenium-webdriver';
import { FavoriteButtonComponent } from '../shared/buttons';
import { RecipeCommentComponent } from '../recipe/recipe comment/recipe-comment.component';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
      const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

      return (invalidCtrl || invalidParent);
    }
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  hide = true;
  authForm: FormGroup;
  authType: String;
  title: String;
  isSubmitting = false;
  formattedErrors: Array<string> = [];
  navigated = false;

  matcher = new MyErrorStateMatcher();
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<HeaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data
    ) {
    this.authForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': [''],
      'error': ['']
    });
  }

  ngOnInit() {
      this.authType = this.data;

      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
      if (this.authType === 'register') {
        this.authForm.addControl('username' as string, new FormControl());
    }

    const listener = window.addEventListener('message', (message) => {
      const sub = this.userService.isAuthenticated.subscribe((authenticated) => {
        if (!authenticated) {
          this.userService.setAuth(message.data);
        }
      });
      sub.unsubscribe();
    });
  }
  getErrorMessage() {
    return this.authForm.hasError('required') ? 'You must enter a value' :
        this.authForm.hasError('email') ? 'Not a valid email' :
            '';
  }

  submitForm() {
    console.log(this.authType);
    this.isSubmitting = true;

    this.userService
      .attemptAuth(this.authType, this.authForm.value)
      .subscribe(
        data => {
          this.dialogRef.close();
          return null;
      }, errorList => {
        this.formattedErrors = Object.keys(errorList.error.errors || {})
        .map(key => {
            return `${errorList.error.errors[key]}`;
        });
        this.authForm.setErrors({ass: true});
      });

  }

  changeAuthType() {
    this.authType = (this.authType === 'register') ? 'login' : 'register';
    this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
    if (this.authType === 'register') {
      this.authForm.addControl('username' as string, new FormControl());
    } else { this.authForm.removeControl('username'); }

  }

  OnNavigate() {
    window.open('http://localhost:3000/users/facebook', 'mywindow', 'location=1,status=1,scrollbars=1, width=800,height=800');
    this.dialogRef.close();
    this.navigated = true;
  }
}

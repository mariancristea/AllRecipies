import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService, Errors } from '../core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HeaderComponent } from '../navigation/header/header.component';
import { TouchSequence } from 'selenium-webdriver';
import { FavoriteButtonComponent } from '../shared/buttons';

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
  

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private fb : FormBuilder,
    private userService : UserService,
    public dialogRef: MatDialogRef<HeaderComponent, FavoriteButtonComponent>,
    @Inject(MAT_DIALOG_DATA) public data
    ) 
    { 
    this.authForm = this.fb.group({
      'email': [''],
      'password': ['']
    });
  }

  ngOnInit() {
    this.authType = this.data;
    this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
    if (this.authType === 'register') {
      this.authForm.addControl('username' as string, new FormControl());
    }
   
  }
  submitForm() {
    this.isSubmitting = true;
    this.errors ={error : {}};
    this.userService
      .attemptAuth(this.authType, this.authForm.value)
      .subscribe(
        data => {
          this.dialogRef.close();
          return null;}
      );
    
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
    window.open("http://localhost:3000/users/google","mywindow","location=1,status=1,scrollbars=1, width=800,height=800");
    let listener = window.addEventListener('message', (message) => {
      this.userService
      .setAuth(message.data);
    });
  }
}
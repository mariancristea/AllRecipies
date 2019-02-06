import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, Errors } from '../core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authForm : FormGroup;
  authType : String;
  title: String;
  isSubmitting = false;
  errors: Errors = {error: {}};
  

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private fb : FormBuilder,
    private userService : UserService) 
    { 
    this.authForm = this.fb.group({
      'email': [''],
      'password': ['']
    });
  }

  ngOnInit() {
    this.authType = this.route.snapshot.url[0].path;
    this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
    if (this.authType === 'register') {
      console.log(this.authType);
      this.authForm.addControl('username' as string, new FormControl());
    }
   
  }
  submitForm() {
    this.isSubmitting = true;
    this.errors ={error : {}};
    this.userService
      .attemptAuth(this.authType, this.authForm.value)
      .subscribe(
        data => this.router.navigateByUrl('/'),
        err => {
          this.errors = err;
          console.log(this.errors);
          this.isSubmitting = false;
        }
      );
    
  }
}
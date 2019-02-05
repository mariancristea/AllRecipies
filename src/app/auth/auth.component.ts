import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authForm : FormGroup;
  authType : String;
  title: String;

  constructor(
    private route :ActivatedRoute,
    private fb : FormBuilder) 
    { 
    this.authForm = this.fb.group({
      'email': [''],
      'password': ['']
    });
  }

  ngOnInit() {
    this.authType = this.route.snapshot.url[0].path;
    this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
    console.log(this.authType);
  }
  submitForm()
  {
    console.log('submit');
  }
}

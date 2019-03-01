import { Component, OnInit } from '@angular/core';
import { UserService, RecipeListConfig } from './core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private userService : UserService) {}

  ngOnInit() {
    this.userService.populate();

  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from './core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.populate();
    console.log('isProd', environment.production);

  }
}

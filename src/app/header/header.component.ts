import { Component, OnInit } from '@angular/core';
import { UserService } from '../core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(private userService : UserService) { }



  ngOnInit() {
  }
  logOut() {
    this.userService.logOut().subscribe();
  }
}

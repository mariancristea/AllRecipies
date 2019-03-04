import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserService } from 'src/app/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  constructor(private userService : UserService) { }



  ngOnInit() {
  }
  logOut() {
    this.userService.logOut().subscribe();
  }

  public onToggleSidenav = () => {
    console.log('Small')
    this.sidenavToggle.emit();
  }
}

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserService } from 'src/app/core';
import { MatDialog } from '@angular/material';
import { AuthComponent } from 'src/app/auth/auth.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  constructor(private userService : UserService,
              private dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(authType: String) : void {
    const dialogRef = this.dialog.open(AuthComponent ,{
      width: '600px',
      height: '600px',
      data: authType
    });
  }

  logOut() {
    this.userService.logOut().subscribe();
  }

  public onToggleSidenav = () => {
    console.log('Small')
    this.sidenavToggle.emit();
  }
}

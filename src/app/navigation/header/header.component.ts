import { Component, OnInit, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { UserService } from 'src/app/core';
import { MatDialog } from '@angular/material';
import { AuthComponent } from 'src/app/auth/auth.component';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();
  inCategories: boolean = false;

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

  showCategories() {
    console.log('test');
    document.getElementById('row2').style.display = 'block';
  }

  hideCategories() {
    setTimeout(() => {
      console.log('leave');
      console.log(this.inCategories);
      if(!this.inCategories) document.getElementById('row2').style.display = 'none';
    }, 200)
    
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
}

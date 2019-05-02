import { Component, OnInit, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { UserService, User, RecipeListConfig, Recipe, RecipeService } from 'src/app/core';
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
  inCategories = false;
  currentUser: User;
  isAuth = false;
  results: Recipe[];
  listConfig: RecipeListConfig = {
    type: 'all',
    search: false,
    filters: {'limit': 3, 'offset': 2}
  };
  constructor(private userService: UserService,
              private dialog: MatDialog,
              private recipesService: RecipeService) { }

  ngOnInit() {

    this.runQuery();
    document.getElementById('row2').style.display = 'none';
    this.userService.isAuthenticated.subscribe(data => this.isAuth = data);
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    );
    this.userService.openDialog.subscribe(
      type => {
        this.openDialog(type);
      }
    );
  }

  openDialog(authType: String): void {
    const dialogRef = this.dialog.open(AuthComponent , {
      width: '600px',
      height: '600px',
      data: authType
    });
  }

  logOut() {
    this.userService.logOut().subscribe();
  }

  showCategories() {
    console.log('show');
    this.inCategories = true;
    document.getElementById('row2').style.cssText = 'display:inline-block !important';
  }

  hideCategories() {
    console.log('hide');
    setTimeout(() => {
      if (!this.inCategories) { document.getElementById('row2').style.cssText = 'display: none !important;'; }
    }, 200);

  }
  hideInstant() {
    document.getElementById('row2').style.cssText = 'display: none !important;';
  }

  runQuery()  {
    this.recipesService.query(this.listConfig)
    .subscribe(data => {
        this.results = data.recipes;

    });
}

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
}

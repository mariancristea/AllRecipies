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
  inCategories: boolean = false;
  currentUser : User;
  results: Recipe[];
  listConfig: RecipeListConfig = {
    type: 'all',
    search: false,
    filters: {'limit': 3}
  };
  constructor(private userService : UserService,
              private dialog: MatDialog,
              private recipesService: RecipeService) { }

  ngOnInit() {
    this.runQuery();
    document.getElementById('row2').style.display = 'none';
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
        console.log('ddddddddd',this.currentUser.image);
      }
    );
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
    this.inCategories = true;
    document.getElementById('row2').style.cssText = 'display:block !important';
  }

  hideCategories() {
    setTimeout(() => {
      console.log('leave');
      console.log(this.inCategories);
      if(!this.inCategories) document.getElementById('row2').style.cssText = 'display: none !important;';
    }, 200)
    
  }

  runQuery()  {
    //this.query.filters.limit = 20;
    console.log("TTT");
    this.recipesService.query(this.listConfig)
    .subscribe(data => {
        console.log('!!!!',this.results);
        this.results = data.recipes;
        
    });
}

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
}

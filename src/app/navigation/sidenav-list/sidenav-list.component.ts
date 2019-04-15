import { Component, EventEmitter, Output, OnInit } from "@angular/core";
import { UserService } from 'src/app/core';


@Component({
    selector: 'app-sidenav-list',
    templateUrl: './sidenav-list.component.html',
    styleUrls: ['./sidenav-list.component.css']
})

export class SidenavListComponent implements OnInit{
    @Output() sidenavClose = new EventEmitter();

    constructor(private userService : UserService) { }

    ngOnInit(){
        this.userService.isAuthenticated.subscribe(data => console.log(data))
    }

    public onSidenavClose = () => {
        this.sidenavClose.emit();
      }
}
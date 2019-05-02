import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';



@Injectable()
export class DialogService{
    constructor(private dialog: MatDialog) {}
}

import { NgModule } from "@angular/core";
import {
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatCheckboxModule,

} from '@angular/material'

@NgModule({
    imports: [
        MatButtonModule,
        MatTabsModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatDividerModule,
        MatCardModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        MatCheckboxModule
    ],
    exports: [
        MatButtonModule,
        MatTabsModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatDividerModule,
        MatCardModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        MatCheckboxModule
        
    ]
})

export class MaterialModule {}
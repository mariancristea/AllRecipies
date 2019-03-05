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
    MatDialogModule
    
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
        MatDialogModule
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
        MatDialogModule
    ]
})

export class MaterialModule {}
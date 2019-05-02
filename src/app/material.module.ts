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
    MatSelectModule,

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
        MatCheckboxModule,
        MatSelectModule
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
        MatCheckboxModule,
        MatSelectModule
    ]
})

export class MaterialModule {}

import { NgModule } from "@angular/core";
import {
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule
    
} from '@angular/material'

@NgModule({
    imports: [
        MatButtonModule,
        MatTabsModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatDividerModule
    ],
    exports: [
        MatButtonModule,
        MatTabsModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatDividerModule
    ]
})

export class MaterialModule {}
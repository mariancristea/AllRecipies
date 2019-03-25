import { SharedModule } from "../shared";
import { SettingsComponent } from './settings.component';
import { NgModule } from '@angular/core';


@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        SettingsComponent
    ],
    entryComponents: [SettingsComponent]
})

export class SettingsModule{}
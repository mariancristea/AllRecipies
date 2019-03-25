import { ModuleWithProviders } from "@angular/compiler/src/core";
import { RouterModule } from '@angular/router';
import { EditorComponent } from './editor.component';
import { AuthGuard } from '../core';

import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { EditorRoutingModule } from './editor-routing.module';
import { EditableRecipeResolver } from './editable-recipe-resolver.service';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        EditorRoutingModule,
        SharedModule,
        FlexLayoutModule
    ],
    declarations: [
        EditorComponent
    ],
    providers: [
        EditableRecipeResolver
    ]
})

export class EditorModule {};

// 
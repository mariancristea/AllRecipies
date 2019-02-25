import { EditorComponent } from "./editor.component";

import { AuthGuard } from '../core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditableRecipeResolver } from './editable-recipe-resolver.service';
import { NoAuthGuard } from '../auth/no-auth-guard.service';


const routes: Routes = [
    {
        path: '',
        component: EditorComponent,
        canActivate: [AuthGuard]
    },
    {
        path: ':slug',
        component: EditorComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class EditorRoutingModule {}
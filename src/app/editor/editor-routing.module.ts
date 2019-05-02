import { EditorComponent } from './editor.component';

import { AuthGuard } from '../core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


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

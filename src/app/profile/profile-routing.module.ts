import { Routes, RouterModule, Router } from "@angular/router";
import { ProfileComponent } from './profile.component';
import { NgModule } from '@angular/core';
import { ProfileResolver } from './profile-resolver.service';



const routes: Routes = [
    {
        path: ':username',
        component: ProfileComponent,
        resolve: {
            profile: ProfileResolver
        },
        children: [
            {
                path: '',
                
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule {}
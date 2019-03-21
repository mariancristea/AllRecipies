import { NgModule } from "@angular/core";
import { SharedModule } from '../shared';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileResolver } from './profile-resolver.service';



@NgModule({
    imports: [
        SharedModule,
        ProfileRoutingModule
    ],
    declarations: [
        ProfileComponent
    ],
    providers: [
        ProfileResolver
    ]
})

export class ProfileModule {}
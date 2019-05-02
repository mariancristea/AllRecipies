import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared';


@NgModule({
    imports: [
        SharedModule,
        HomeRoutingModule
    ],
    declarations: [
        HomeComponent
    ]
})

export class HomeModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { NoAuthGuard } from './no-auth-guard.service';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
    FlexLayoutModule
  ],
  providers: [
    NoAuthGuard
  ]
})
export class AuthModule { }

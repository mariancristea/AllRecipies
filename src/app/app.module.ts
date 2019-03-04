import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule } from './auth/auth.module';

import { CoreModule } from './core';
import { SharedModule, ListErrorsComponent } from './shared';
import { HomeModule } from './home/home.module';

import { MaterialModule } from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  imports: [
    AuthModule,
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    SharedModule,
    HomeModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

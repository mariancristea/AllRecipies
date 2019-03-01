import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { AuthModule } from './auth/auth.module';

import { CoreModule } from './core';
import { SharedModule, ListErrorsComponent } from './shared';
import { HomeModule } from './home/home.module';







@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    AuthModule,
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    SharedModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

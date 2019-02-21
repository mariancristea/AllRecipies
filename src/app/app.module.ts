import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { AuthModule } from './auth/auth.module';

import { CoreModule } from './core';
import { SharedModule, ListErrorsComponent } from './shared';
import { RecipiesComponent } from './recipies/recipies.component';
import { EditorModule } from './editor/editor.module';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipiesComponent
  ],
  imports: [
    AuthModule,
    AppRoutingModule,
    BrowserModule,
    EditorModule,
    CoreModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

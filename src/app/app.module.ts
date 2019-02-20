import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipiesComponent } from './recipies/recipies.component';
import { AuthComponent } from './auth/auth.component';
import { AuthModule } from './auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService, ApiService } from './core';
import { ListErrorsComponent } from './shared/list-errors.component';
import { ShowAuthedDirective } from './shared/show-authed.directive';
import { JwtService } from './core/services/jwt.service';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';
import { AuthGuard } from './core/services/auth-guard.service';
import { NoAuthGuard } from './auth/no-auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipiesComponent,
    AuthComponent,
    ListErrorsComponent,
    ShowAuthedDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide : HTTP_INTERCEPTORS, useClass : HttpTokenInterceptor, multi: true},
    UserService,
    ApiService, 
    JwtService,
    AuthGuard,
    NoAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

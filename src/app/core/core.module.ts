import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';

import { 
    ApiService, 
    AuthGuard, 
    JwtService, 
    RecipeService, 
    UserService, 
    CommentsService
} from './services';
import { SearchService } from './services/search.service';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        ApiService,
        AuthGuard,
        CommentsService,
        JwtService,
        RecipeService,
        UserService,
        SearchService,
        { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true}
    ],
    declarations: []
})

export class CoreModule { }
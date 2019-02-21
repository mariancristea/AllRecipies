import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { RecipiesComponent } from './recipies/recipies.component';

const routes: Routes = [
  {path: '', redirectTo: '/recipies', pathMatch: 'full'},
  
  {path: 'recipies', component: RecipiesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

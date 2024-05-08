import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes =  [
  { path: 'home', component:  HomePageComponent },
  { path: 'users', component: UserComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

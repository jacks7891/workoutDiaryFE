import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { UserComponent } from './components/user/user.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomePageComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

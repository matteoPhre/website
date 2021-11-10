import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { WhoamiComponent } from './whoami/whoami.component';
import { Error404Component } from './error404/error404.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WhoamiComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

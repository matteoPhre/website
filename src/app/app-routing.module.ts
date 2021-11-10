import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from './error404/error404.component';
import { HomeComponent } from './home/home.component';
import { WhoamiComponent } from './whoami/whoami.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
},
{
  path: 'whoami',
  component: WhoamiComponent
}, {
  path: 'crondaily',
  component: Error404Component
},
{
  path: 'posts',
  component: Error404Component
}, {
  path: 'posts/:postno',
  component: Error404Component
},
{
  path: 'tags',
  component: Error404Component
},
{
  path: 'tags/:tagid',
  component: Error404Component
},
{
  path: '404',
  component: Error404Component
},
{
  path: '**',
  redirectTo: '404'
}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './content/account/home/home.component';
import { LoginComponent } from './content/account/login/login.component';
import { CurrentListComponent } from './content/current-list/current-list.component';
import { PreviousListComponent } from './content/previous-list/previous-list.component';
import { AppSideNavComponent } from './side-nav/side-nav.component';

const appRoute: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'list',
    component: AppSideNavComponent,
    children: [
      {
        path: '',
        component: CurrentListComponent,
      },
      {
        path: 'currentlist',
        component: CurrentListComponent,
      },
      {
        path: 'previouslist',
        component: PreviousListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoute, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CurrentListComponent } from './content/current-list/current-list.component';
import { PreviousListComponent } from './content/previous-list/previous-list.component';

const appRoute: Routes = [
  {
    path: "",
    component: CurrentListComponent,
  },
  {
    path:"previous-list",
    component:PreviousListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoute, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

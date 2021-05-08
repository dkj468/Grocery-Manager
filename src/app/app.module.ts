import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatExpansionModule } from "@angular/material/expansion";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { AppSideNavComponent } from "./side-nav/side-nav.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CurrentListComponent } from "./content/current-list/current-list.component";
import { AppRoutingModule } from "./app-routing.module";
import { PreviousListComponent } from "./content/previous-list/previous-list.component";
import { ItemListComponent } from "./content/current-list/item-list/item-list.component";
import { CreateItemComponent } from "./content/current-list/create-item/create-item.component";
import { DateFormatPipe } from "./pipe/dateFormat.pipe";

@NgModule({
  declarations: [
    AppComponent,
    AppSideNavComponent,
    CurrentListComponent,
    PreviousListComponent,
    ItemListComponent,
    CreateItemComponent,
    DateFormatPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    MatExpansionModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

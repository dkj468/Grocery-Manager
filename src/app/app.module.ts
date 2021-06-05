import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppSideNavComponent } from './side-nav/side-nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrentListComponent } from './content/current-list/current-list.component';
import { AppRoutingModule } from './app-routing.module';
import { PreviousListComponent } from './content/previous-list/previous-list.component';
import { ItemListComponent } from './content/current-list/item-list/item-list.component';
import { CreateItemComponent } from './content/current-list/create-item/create-item.component';
import { DateFormatPipe } from './pipe/dateFormat.pipe';
import { LoginComponent } from './content/account/login/login.component';
import { JWTInterceptor } from './_interceptors/jwt.interceptor';
import { RegisterComponent } from './content/account/register/register.component';
import { HomeComponent } from './content/account/home/home.component';

export function tokenGetter() {
  console.log('token generator invoked');
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    AppSideNavComponent,
    CurrentListComponent,
    PreviousListComponent,
    ItemListComponent,
    CreateItemComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
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
    MatTooltipModule,
    MatMenuModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

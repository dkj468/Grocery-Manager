import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user.model';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Grocery-Manager';

  constructor(private authService: AuthService, private router: Router) {}

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.authService.setCurrentUser(user);
    // if user has found then navigate to currentlist
    if (user) {
      this.router.navigate(['/currentlist']);
    } else {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.setCurrentUser();
  }
}

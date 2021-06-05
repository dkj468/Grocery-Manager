import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(public authService: AuthService, public router: Router) {}
  register(regForm: NgForm) {
    this.authService
      .register(
        regForm.value.name,
        regForm.value.email,
        regForm.value.password,
        regForm.value.confirmPassword
      )
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        },
        () => {
          this.router.navigate(['/list']);
        }
      );
  }
}

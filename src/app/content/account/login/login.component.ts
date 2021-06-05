import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginInvalid: boolean = false;
  private loginSub: Subscription;
  constructor(public authService: AuthService, public router: Router) {
    console.log('inside login constructor');
  }

  onLogin(loginForm: NgForm) {
    this.loginSub = this.authService
      .login(loginForm.value.email, loginForm.value.password)
      .subscribe(
        (response) => {
          console.log(response);
          this.loginInvalid = false;
        },
        (error) => {
          this.loginInvalid = true;
          console.log(error);
        },
        () => {
          this.router.navigate(['/list']);
        }
      );
  }

  ngOnInit() {
    console.log('inside login');
    // this.authService.currentUser.subscribe((user) => {
    //   if (user) {
    //     this.router.navigate(['/currentlist']);
    //   }
    // });
  }

  ngOnDestroy() {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }
}

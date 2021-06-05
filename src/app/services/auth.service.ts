import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSource = new ReplaySubject<User>(1);
  public currentUser = this.currentUserSource.asObservable();
  constructor(public httpClient: HttpClient) {}

  login(email: string, password: string) {
    return this.httpClient
      .post('http://127.0.0.1:3000/api/v1/user/login', {
        email: email,
        password: password,
      })
      .pipe(
        map((response: any) => {
          const user: User = response.data.user;
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        })
      );
  }

  register(
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    return this.httpClient
      .post('http://127.0.0.1:3000/api/v1/user/signup', {
        name: name,
        email: email,
        password: password,
        passwordConfirm: confirmPassword,
      })
      .pipe(
        map((response: any) => {
          console.log(response.data);
          const user: User = response.data.user;
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        })
      );
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:8080/user';
  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {
    this.checkLoginStatus();
  }

  private checkLoginStatus() {
    const token = this.getAuthToken();
    const isUserLoggedIn = !!token;
    this.loggedIn.next(isUserLoggedIn);
  }

  getAuthToken(): string {
    return localStorage.getItem('jwt-token') || '';
  }

  setAuthToken(token: string) {
    localStorage.setItem('jwt-token', token);
  }

  getAuthRole(): string[] {
    const role = localStorage.getItem('role');
    return role ? JSON.parse(role) : [];
  }

  setAuthRole(role: string[] | string) {
    if (typeof role === 'string') {
      role = role.split(',');
    }
    localStorage.setItem('role', JSON.stringify(role));
  }

  getAuthId(): string {
    return localStorage.getItem('user-id') || '';
  }

  setAuthId(id: string) {
    localStorage.setItem('user-id', id);
  }

  register(body: {
    email: string;
    password: string;
    lastName: string;
    firstName: string;
  }) {
    return this.http.post(`${this.url}/register`, body).pipe(
      tap((value: any) => {
        if (value.token) {
          this.setAuthToken(value.token);
        }
        if (value.role) {
          this.setAuthRole(value.role);
        }
        if (value.id) {
          this.setAuthId(value.id);
        }
      }),
    );
  }

  login(body: { email: string; password: string }) {
    return this.http.post(`${this.url}/login`, body).pipe(
      tap((value: any) => {
        if (value.token) {
          this.setAuthToken(value.token);
        }
        if (value.role) {
          this.setAuthRole(value.role);
        }
        if (value.id) {
          this.setAuthId(value.id);
        }
      }),
    );
  }

  forgotPassword(email: string) {
    return this.http.post(`${this.url}/forgot-password?email=${email}`, {});
  }
}

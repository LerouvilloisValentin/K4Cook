import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserSettingService {
  private url = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {}
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  getUser() {
    return this.http.get<User>(`${this.url}/me`).pipe(
      tap((user) => {
        this.userSubject.next(user);
      }),
    );
  }

  deleteOwnAccount() {
    return this.http.delete<User[]>(`${this.url}`);
  }
}

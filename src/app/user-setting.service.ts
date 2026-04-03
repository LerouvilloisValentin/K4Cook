import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserSettingService {
  private url = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get<User>(`${this.url}/me`);
  }

  deleteOwnAccount() {
    return this.http.delete<User[]>(`${this.url}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  private url = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get<User[]>(`${this.url}`);
  }

  getAllMail(): Observable<string[]>{
    return this.http.get<string[]>(`${this.url}/getEmails`)
  }

  searchUsersByEmail(email: string) {
    return this.http.get<User[]>(`${this.url}/email/${email}`);
  }

  suspendUser(userId: number, days: number): Observable<User> {
    return this.http.patch<User>(`${this.url}/${userId}/suspend/${days}`, {});
  }

  reintegrateUser(userId: number): Observable<User> {
    return this.http.patch<User>(`${this.url}/${userId}/unsuspend`, {});
  }

}

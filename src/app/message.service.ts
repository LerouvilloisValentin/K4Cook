import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LikedDisliked, Message } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private url = 'http://localhost:8080/messages';

  constructor(private http: HttpClient) {}

  sendMessage(body: { sectionId: number; content: string }) {
    return this.http.post<Message>(`${this.url}`, body);
  }

  like(id: number): Observable<LikedDisliked> {
    return this.http.post<LikedDisliked>(`${this.url}/${id}/like`, {});
  }

  dislike(id: number): Observable<LikedDisliked> {
    return this.http.post<LikedDisliked>(`${this.url}/${id}/dislike`, {});
  }
}

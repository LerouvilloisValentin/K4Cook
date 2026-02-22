import { Component, Input } from '@angular/core';
import { Message } from '../user.model';
import { MessageService } from '../message.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-user-message',
  standalone: true,
  imports: [],
  templateUrl: './user-message.component.html',
  styleUrl: './user-message.component.css',
})
export class UserMessageComponent {
  @Input() message?: Message;

  thumbsUp: boolean = false;
  thumbsDown: boolean = false;
  userId: number = -1;

  constructor(
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userId = parseInt(this.authService.getAuthId(),10);
    console.log(this.authService.getAuthId());

    console.log(this.userId);

    console.log(this.message);

    this.thumbsDown =
    this.message?.dislikeUserIds.includes(this.userId) || false;
    this.thumbsUp = this.message?.likeUserIds.includes(this.userId) || false;
    console.log(this.thumbsDown);
    console.log(this.thumbsUp);

  }

  getUserId() {
    this.userId = parseInt(this.authService.getAuthId());
  }

  onClickLike() {
    if (this.message) {
      this.messageService.like(this.message.id).subscribe((response) => {
        this.thumbsUp = response.isLiked;
        this.thumbsDown = response.isDisliked;
      });
    }
  }

  onClickDislike() {
    if (this.message) {
      this.messageService.dislike(this.message.id).subscribe((response) => {
        this.thumbsUp = response.isLiked;
        this.thumbsDown = response.isDisliked;
      });
    }
  }
}

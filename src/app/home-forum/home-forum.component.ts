import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ForumsService } from '../forums.service';
import { Subject } from '../user.model';
import { SubscribeManagementComponent } from '../subscribe-management/subscribe-management.component';

@Component({
  selector: 'app-home-forum',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home-forum.component.html',
  styleUrl: './home-forum.component.css',
})
export class HomeForumComponent
  extends SubscribeManagementComponent
  implements OnInit
{
  isModalOpen: boolean = false;
  isAdmin: boolean = false;
  newSubjectDescription: string = '';
  newSubjectTitle = '';
  isLoggedIn: boolean = false;
  subjects: Subject[] = [];
  isOwnSection: boolean = false;
  authId = this.authService.getAuthId();

  constructor(
    private forumService: ForumsService,
    private authService: AuthService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.getSubjects();
    const token = this.authService.getAuthToken();
    const authId = this.authService.getAuthId();
    if (
      this.subjects.some((subject) => subject.user.id.toString() === authId)
    ) {
      this.isOwnSection = true;
    }
    if (token) {
      this.isLoggedIn = !this.isLoggedIn;
    }
  }

  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }
  createSubject() {
    const subjectBody = {
      title: this.newSubjectTitle || '',
      content: this.newSubjectDescription || '',
    };
    if (this.newSubjectTitle && this.newSubjectDescription) {
      const sub = this.forumService
        .sendNewSubject(subjectBody)
        .subscribe((value: Subject) => {
          this.newSubjectTitle = '';
          this.newSubjectDescription = '';
          this.subjects.push(value);
          this.closeModal();
        });

      this.addSubscription(sub);
    }
  }

  getSubjects() {
    const sub = this.forumService
      .getSubjects()
      .subscribe((subjects: Subject[]) => {
        console.log('subjects', subjects);

        this.subjects = subjects;
        const authId = this.authService.getAuthId();

        if (
          this.subjects.some((subject) => subject.user.id.toString() === authId)
        ) {
          this.isOwnSection = true;
        }
      });

    this.addSubscription(sub);
  }

  deleteSubject(subjectId: number) {
    this.forumService.deleteById(subjectId).subscribe();
  }
}

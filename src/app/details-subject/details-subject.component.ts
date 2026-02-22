import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ForumsService } from '../forums.service';
import { MessageService } from '../message.service';
import { SubscribeManagementComponent } from '../subscribe-management/subscribe-management.component';
import { UserMessageComponent } from '../user-message/user-message.component';
import { Subject } from '../user.model';

@Component({
  selector: 'app-details-subject',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    UserMessageComponent,
  ],
  templateUrl: './details-subject.component.html',
  styleUrl: './details-subject.component.css',
})
export class DetailsSubjectComponent extends SubscribeManagementComponent {
  messageForm: FormGroup;
  subject?: Subject;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private forumService: ForumsService
  ) {
    super();
    this.messageForm = this.formBuilder.group({
      message: '',
    });
  }

  @Input()
  set id(id: number) {
    const sub = this.forumService
      .getSubjectById(id)
      .subscribe((value: Subject) => (this.subject = value));

    this.addSubscription(sub);
  }

  // getSubject(id: number) {
  //   const sub = this.forumService.getSubjectById(id).subscribe((value: Subject) => {
  //     this.subject = value;
  //   });

  //   this.addSubscription(sub);
  // }

  submitMessage() {
    const messageContent = this.messageForm.get('message')?.value;

    if (messageContent && this.subject) {
      const messageData = {
        sectionId: this.subject.id,
        content: messageContent,
      };

      this.messageService.sendMessage(messageData).subscribe(
        (response) => {
          this.subject?.messages.push(response);
          this.messageForm.reset();
        },
        (error) => {
          console.error("Erreur lors de l'envoi du message", error);
        }
      );
    }
  }
}

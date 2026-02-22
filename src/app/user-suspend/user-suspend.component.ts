import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../user.model';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-suspend',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './user-suspend.component.html',
  styleUrl: './user-suspend.component.css',
})
export class UserSuspendComponent {
  @Input() user?: User;
  @Output() onSuspend = new EventEmitter<{ id: number; days: number }>();
  @Output() onReintegrate = new EventEmitter<number>();
  isModalOpen: boolean = false;
  suspensionDays: number = 0;

  isOpen() {
    this.isModalOpen = !this.isModalOpen;
  }

  suspend() {
    if (this.user) {
      this.onSuspend.emit({ id: this.user.id, days: this.suspensionDays });
    }
    this.isOpen();
  }

  reintegrate() {
    if (this.user) {
      this.onReintegrate.emit(this.user.id);
    }
  }
}

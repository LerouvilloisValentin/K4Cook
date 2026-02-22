import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subscribe-management',
  standalone: true,
  imports: [],
  templateUrl: './subscribe-management.component.html',
  styleUrl: './subscribe-management.component.css',
})
export class SubscribeManagementComponent {
  protected subscriptions = new Set<Subscription>();

  addSubscription(subscription: Subscription): void {
    this.subscriptions.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}

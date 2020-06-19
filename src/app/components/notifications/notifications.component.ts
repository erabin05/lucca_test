import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notifications: string[];

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.notificationService
          .getNotifications()
          .subscribe((notifications) => {
            this.notifications = notifications;
          });
  }

}

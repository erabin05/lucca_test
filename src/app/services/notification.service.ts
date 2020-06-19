import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notificationsSubject = new BehaviorSubject<string[]>([]);

  constructor() { }

  getNotifications(): Observable<string[]> {
    return this.notificationsSubject.asObservable();
  }

  newNotification(msg: string): void {
    let notifications;
    this.notificationsSubject
          .asObservable()
          .subscribe((notifs: string[]) => {
            notifications = notifs;
          });
    this.notificationsSubject.next([ ... notifications, msg]);

    let notificationsAfterTime;
    setTimeout(() => {
      this.notificationsSubject
        .asObservable()
        .subscribe((notifs: string[]) => {
          notificationsAfterTime = notifs;
        });
      this.notificationsSubject.next(notificationsAfterTime.filter(notif => notif !== msg));
    }, 2000);
  }
}

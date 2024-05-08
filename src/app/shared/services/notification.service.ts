import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserNotification } from 'src/app/shared/models/user-notification';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  getNotifications = (limit: number): Observable<UserNotification[]> =>
    this.http.get<UserNotification[]>(`${environment.apiUrl}notifications/user/mine?limit=${limit}`);


  updateNotificationStaus = (id: string, target: string) =>
    this.http.patch<UserNotification[]>(`${environment.apiUrl}notifications/${id}`, {target: target})
}

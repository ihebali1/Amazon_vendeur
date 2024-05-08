import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http.get(`${environment.apiUrl}orders/vendors/mine`)
  }

  getOrderStatistics() {
    return this.http.get(`${environment.apiUrl}orders/statistics-vendor/mine`)
  }

  getOrder(orderId: string) {
    return this.http.get(`${environment.apiUrl}orders/${orderId}/vendor`)
  }

  updateShippingInfo(orderId: string, status: string) {
    return this.http.patch(`${environment.apiUrl}orders/${orderId}/shipping`, {
      status: status
    })
  }

  getReportMessages(reportId: string) {
    return this.http.get(`${environment.apiUrl}report-orders/${reportId}/messages`)
  }

  

  sendMessage(reportId: string, message: string, imageId: string, videoId: string):Observable<any> {
    return this.http.patch(
      `${environment.apiUrl}report-orders/${reportId}/message`, {message: message, image: imageId, video: videoId}
    );
  }
}

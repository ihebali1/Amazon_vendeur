import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class SubscriptionService {
    constructor(public http: HttpClient) {
    }
    getSubscription(): Observable<any> {
        return this.http.get(`${environment.apiUrl}subscriptions`);
    }

    createUserSubscription(subscriptionData: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}user-subscription`, subscriptionData);
    }

    cancelUserSubscription(userSubscriptionId: string): Observable<any> {
        return this.http.patch(`${environment.apiUrl}user-subscription/${userSubscriptionId}/cancel`, {});
    }

    getUserActiveSubscription(): Observable<any> {
        return this.http.get(`${environment.apiUrl}user-subscription/active-subscription`);
    }




}


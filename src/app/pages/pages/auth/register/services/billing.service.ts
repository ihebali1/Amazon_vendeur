import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { RegisterModule } from "../register.module";

@Injectable()
export class BillingService {
    userId;

    headers = new HttpHeaders().set('Content-Type', 'application/json');
constructor(public http: HttpClient){
    this.userId = JSON.parse(localStorage.getItem('user_data')).id
    console.log(this.userId)
}

getInfoUser(): Observable<any> {
    return this.http.get(`${environment.apiUrl}vendor/mine`);
}

getAddress(): Observable<any> {
    return this.http.get(`${environment.apiUrl}adress`);
}

updateBillingInfo(info){
    return this.http.patch(`${environment.apiUrl}verifications/${this.userId}/billing` ,info)
}

savebilling(billingData) {
    localStorage.setItem('billing_data',JSON.stringify(billingData) )   
  }


}


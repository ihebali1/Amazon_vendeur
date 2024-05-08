import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { RegisterModule } from "../register.module";

@Injectable()
export class SellerInfoService {
    vendorId;
    static URL = '/api/states';
    headers = new HttpHeaders().set('Content-Type', 'application/json');
constructor(public http: HttpClient){
    this.vendorId = JSON.parse(localStorage.getItem('user_data')).id
    console.log(this.vendorId)
}

getNameUser(): Observable<any> {
    return this.http.get(`${environment.apiUrl}vendor/mine`);
}

getSellerStates(): Observable<any> {
    return this.http.get(`${environment.apiUrl}countries`);
}

getJurisdictions(): Observable<any> {
    return this.http.get(`${environment.apiUrl}states`);
}

updateSellerInfo(info){
    return this.http.patch(`${environment.apiUrl}verifications/${this.vendorId}/seller-info` ,info)
}

saveSellerInfo(sellerData) {
    localStorage.setItem('seller_data',JSON.stringify(sellerData) )   
  }


}


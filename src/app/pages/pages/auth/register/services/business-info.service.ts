import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class BusinessInfoService {
    userId;

    headers = new HttpHeaders().set('Content-Type', 'application/json');
    constructor(public http: HttpClient) {
        this.userId = JSON.parse(localStorage.getItem('user_data')).id
        console.log(this.userId)
    }

    getCountries(): Observable<any> {
        return this.http.get(`${environment.apiUrl}countries`);
    }

    updateBusinessInfo(info) {
        return this.http.patch(`${environment.apiUrl}verifications/${this.userId}/business-info`, info)
    }

    savebusinessInfo(businessData) {
        localStorage.setItem('business_data', JSON.stringify(businessData))
    }

    getVendorInfo(): Observable<any> {
        return this.http.get(`${environment.apiUrl}vendor/mine`);
    }


}


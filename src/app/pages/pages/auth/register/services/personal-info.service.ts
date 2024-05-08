import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class SellerInfoPersonalService {
    userId;

    headers = new HttpHeaders().set('Content-Type', 'application/json');


    constructor(public http: HttpClient){
        this.userId = JSON.parse(localStorage.getItem('user_data')).id
    console.log(this.userId)

}
getInfoUser(): Observable<any> {
    return this.http.get(`${environment.apiUrl}vendor/${this.userId}`);
}

getCountries(): Observable<any> {
    return this.http.get(`${environment.apiUrl}countries`);
}

updatePersonalInfo(info){
    return this.http.patch(`${environment.apiUrl}verifications/${this.userId}/personal-info` ,info)
}

savePersonalInfo(personalData) {
    localStorage.setItem('personal_data',JSON.stringify(personalData) )   
  }

}


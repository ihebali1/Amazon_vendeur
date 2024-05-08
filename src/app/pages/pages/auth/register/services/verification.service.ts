import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class VerificationService {
    vendorId;
    static URL = '/api/states';
    headers = new HttpHeaders().set('Content-Type', 'application/json');
constructor(public http: HttpClient){
    this.vendorId = JSON.parse(localStorage.getItem('user_data'))?.id
    
}


getVendorInfo(): Observable<any> {
    return this.http.get(`${environment.apiUrl}vendor/mine`);
}

submitDocuments(data){
    return this.http.patch(`${environment.apiUrl}verifications/${this.vendorId}/documents` ,data)
}
}
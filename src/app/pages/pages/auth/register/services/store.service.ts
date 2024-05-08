import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { RegisterModule } from "../register.module";

@Injectable()
export class StoreService {
    userId;

    headers = new HttpHeaders().set('Content-Type', 'application/json');
constructor(public http: HttpClient){
    this.userId = JSON.parse(localStorage.getItem('user_data')).id
    console.log(this.userId)
}

updateStore(info){
    return this.http.patch(`${environment.apiUrl}verifications/${this.userId}/store` ,info)
}

saveStore(storeData) {
    localStorage.setItem('store_data',JSON.stringify(storeData) )   
  }


}


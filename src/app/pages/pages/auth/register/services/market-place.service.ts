import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class MarketPlaceService {
    userId;
    headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(public http: HttpClient){
        this.userId = JSON.parse(localStorage.getItem('user_data')).id
    console.log(this.userId)

}

updateMarketPlace(info){
    return this.http.patch(`${environment.apiUrl}verifications/${this.userId}/market-Place` ,info)
}

saveMarketPlace(marketData) {
    localStorage.setItem('market_data',JSON.stringify(marketData) )   
  }

}


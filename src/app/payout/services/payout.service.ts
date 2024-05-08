import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PayoutService {

  constructor(private http: HttpClient) { }
  addPayout(payout: any) {
    return this.http.post(`${environment.apiUrl}payouts`,payout)
  }

  getPayouts()
  { return this.http.get(`${environment.apiUrl}payouts/mine`)}

  getPayout(payoutId:string){
    return this.http.get(`${environment.apiUrl}payouts/${payoutId}`)
     }
}

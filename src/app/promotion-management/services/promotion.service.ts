import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient) {}
  addPromotions(promotionPromotional: any) {
    return this.http.post(`${environment.apiUrl}promotions`,promotionPromotional)
  }
  //Get All Promotions
  getPromotions()
  { return this.http.get(`${environment.apiUrl}promotions`)}
  
  getPromotion(promotionId:string){
    return this.http.get(`${environment.apiUrl}promotions/${promotionId}`)
     }
    
}

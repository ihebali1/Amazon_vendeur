import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private http: HttpClient) {}
  
  addCoupons(couponsPromotional: any) {
    return this.http.post(`${environment.apiUrl}coupons`,couponsPromotional)
  }
//Get All Coupons
  getCoupons()
  { return this.http.get(`${environment.apiUrl}coupons`)}
  
 //Get Coupons by Id
 getCoupon(couponId:string){
return this.http.get(`${environment.apiUrl}coupons/${couponId}`)
 }


}

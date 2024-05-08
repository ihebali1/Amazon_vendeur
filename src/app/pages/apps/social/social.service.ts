import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  constructor(private http: HttpClient, private router: Router) { }
  getVendor() {
    return this.http.get(`${environment.apiUrl}vendor`);
  }
  getvendorById(vendorId: string) {
    return this.http.get(`${environment.apiUrl}vendor/${vendorId}`);
  }
  updatePerInfo(vendorId: string, vendor: any) {
    return this.http.patch(`${environment.apiUrl}vendor/${vendorId}/personnalInfo`, vendor)
  }

  updateDocuments(vendorId: string, updatedDocument: any) {
    return this.http.patch(`${environment.apiUrl}vendor/${vendorId}/documents`, updatedDocument)
  }

  updateBankInfo(vendorId: string, bankInfo: any) {
    return this.http.patch(`${environment.apiUrl}vendor/${vendorId}/bank-account`, bankInfo)
  }

  updateBusInfo(vendorId: string, vendor: any) {
    return this.http.patch(`${environment.apiUrl}vendor/${vendorId}/businessInfo`, vendor)
  }
  changePassword(password: any) {
    return this.http.patch(`${environment.apiUrl}auth/change-password`, password)
  }
  logout() {
    localStorage.clear();
    this.router.navigate([
      'login'
    ]);
  }
}

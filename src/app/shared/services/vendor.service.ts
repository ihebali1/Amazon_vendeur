import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http: HttpClient) { }
  getMyDetails() {
    return this.http.get(`${environment.apiUrl}vendor/mine`)
  }
}

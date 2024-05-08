import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  constructor(private http:HttpClient, private router: Router) { }
 forgotPassword(email:any){
    return this.http.post(`${environment.apiUrl}auth/forgot-password`,email);
  }
}

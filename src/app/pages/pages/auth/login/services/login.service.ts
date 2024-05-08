import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  endpoint: string = environment.apiUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private http: HttpClient, private router: Router) { }

  // Sign-in
  signIn(user) {

    return this.http.post(environment.apiUrl + 'auth/login/vendor', user)
  }

  get isLoggedIn(): boolean {
    let loginToken = localStorage.getItem('access_token');
    return (loginToken !== null) ? true : false;
  }

  saveToken(token) {
    localStorage.setItem('access_token', token)
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  getUser() {
    return localStorage.getItem('user_data');
  }

  saveUser(userData) {
    localStorage.setItem('user_data', JSON.stringify(userData))
  }

  logout() {
    localStorage.clear();
    this.router.navigate([
      'login'
    ]).then(
      res => location.reload()
    );
  }

}

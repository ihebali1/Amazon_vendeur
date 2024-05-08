import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private http: HttpClient) { }

  getIncomeHistory() {
    return this.http.get(`${environment.apiUrl}incomes/vendors`)
  }

  getIncomeStatistics() {
    return this.http.get(`${environment.apiUrl}incomes/vendor-income-statistics`)
  }

  getIncomeById(id) {
    return this.http.get(`${environment.apiUrl}incomes/` + id)
  }
}

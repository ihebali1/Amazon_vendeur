import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  getDepartmentsWithChildCategories() {
    return this.http.get(`${environment.apiUrl}departments/child-categories`)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChildCategoryService {

  constructor(private http: HttpClient) { }

  getChildCategoriesByName (name: string) {
    return this.http.get(`${environment.apiUrl}child-categories?name=${name}`)
  }

  getChildCategory (id: string) {
    return this.http.get(`${environment.apiUrl}child-categories/${id}`)
  }
}

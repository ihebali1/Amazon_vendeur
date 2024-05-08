import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Brand } from "../models/brand";

@Injectable({
  providedIn: "root",
})
export class BrandService {
  constructor(private http: HttpClient) {}

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${environment.apiUrl}back-office-brands`);
  }

  removeBrand(brandId: string) {
    return this.http.delete<Brand[]>(
      `${environment.apiUrl}back-office-brands/${brandId}`
    );
  }

  createBrand(brand: Brand) {
    return this.http.post(`${environment.apiUrl}back-office-brands`, brand);
  }

  updateBrand(brand: Brand) {
    let id = brand.id;
    delete brand.id;
    return this.http.patch(
      `${environment.apiUrl}back-office-brands/${id}`,
      brand
    );
  }
}

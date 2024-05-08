import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ProductServiceService {
  constructor(private http: HttpClient) {}

  addProduct(productInfo: any) {
    return this.http.post(`${environment.apiUrl}products`, productInfo);
  }

  getProducts() {
    return this.http.get(`${environment.apiUrl}products/mine`);
  }

  getProductsWithPagination(page, number) {
    return this.http.get(`${environment.apiUrl}products/mine?status=APPROVED`);
  }

  getProduct(productId: string, type: string) {
    return this.http.get(
      `${environment.apiUrl}products/${productId}?type=${type}`
    );
  }

  updateVitalInfo(productId: string, vitalInfo: any) {
    return this.http.patch(
      `${environment.apiUrl}products/${productId}/vital-info`,
      vitalInfo
    );
  }

  updateProductStatus(productId: string, data: any) {
    return this.http.patch(
      `${environment.apiUrl}products/${productId}/activation`,
      data
    );
  }

  updateOffer(productId: string, offer: any) {
    return this.http.patch(
      `${environment.apiUrl}products/${productId}/offer`,
      offer
    );
  }
  updateDescription(productId: string, description: any) {
    return this.http.patch(
      `${environment.apiUrl}products/${productId}/description`,
      description
    );
  }
  updateVariation(productId: string, variation: any) {
    return this.http.patch(
      `${environment.apiUrl}products/${productId}/variation`,
      variation
    );
  }

  updatePrimaryImage(productId: string, primaryImage: any, type: string) {
    return this.http.patch(
      `${environment.apiUrl}products/${productId}/primaryImage`,
      { primaryImage: primaryImage, type: type }
    );
  }

  updateKeywords(productId: string, keywords: any) {
    return this.http.patch(
      `${environment.apiUrl}products/${productId}/keywords`,
      keywords
    );
  }
  removeFeatureFromProduct(productId: string, featureId: string, type: string) {
    return this.http.patch(
      `${environment.apiUrl}products/${productId}/features/${featureId}`,
      { type: type }
    );
  }
  removeImageFromProduct(productId: string, image: string, type: string) {
    return this.http.patch(
      `${environment.apiUrl}products/${productId}/images`,
      {
        type: type,
        image: image,
      }
    );
  }
  addImageFromProduct(productId: string, image: string, type: string) {
    return this.http.patch(
      `${environment.apiUrl}products/${productId}/images/add`,
      {
        type: type,
        image: image,
      }
    );
  }
  addFeatureFromProduct(productId: string, feature: string, type: string) {
    return this.http.patch(
      `${environment.apiUrl}products/${productId}/features/add`,
      {
        type: type,
        feature: feature,
      }
    );
  }
  addKeywordFromProduct(productId: string, keyword: string, type: string) {
    return this.http.patch(
      `${environment.apiUrl}products/${productId}/keywords/add`,
      {
        type: type,
        keyword: keyword,
      }
    );
  }
  removeWarningFromProduct(productId: string, warningId: string, type: string) {
    return this.http.patch(
      `${environment.apiUrl}products/${productId}/warnings/${warningId}`,
      { type: type }
    );
  }

  removeSpecificationFromProduct(productId: string, specificationId: string, type: string) {
    return this.http.patch(
      `${environment.apiUrl}products/${productId}/specifications/${specificationId}`,
      { type: type }
    );
  }

  removeKeywordFromProduct(productId: string, keywordId: string, type: string) {
    return this.http.patch(
      `${environment.apiUrl}products/${productId}/keywords/${keywordId}`,
      { type: type }
    );
  }
  addWarningFromProduct(productId: string, warning: string, type: string) {
    return this.http.patch(
      `${environment.apiUrl}products/${productId}/warnings/add`,
      {
        type: type,
        warning: warning,
      }
    );
  }

  addSpecificationToProduct(productId: string, specification: any, type: string) {
    return this.http.patch(
      `${environment.apiUrl}products/${productId}/specifications/add`,
      {
        ...specification,
        type: type,
      }
    );
  }

  getSimpleProducts() {
    return this.http.get(`${environment.apiUrl}products/mine`);
  }

  getParentListings() {
    return this.http.get(`${environment.apiUrl}products/parent-listing`);
  }
}

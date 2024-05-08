import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Deal} from "../Models/deal";

@Injectable({
    providedIn: 'root'
})
export class DealsService {
    server = environment.apiUrl;

    constructor(private httpClient: HttpClient) { }

    public getDeals(page, number): Observable<Deal[]>{
        return this.httpClient.get<Deal[]>(this.server + 'deals?page=' + page + '&number=' + number);
    }

    public saveDeal(deal): Observable<Deal>{
        return this.httpClient.post<Deal>(this.server + 'deals', deal);
    }

    public endOffer(id: string): Observable<Deal>{
        return this.httpClient.patch<Deal>(`${this.server}offers/${id}`, {});
    }

}
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../commons/_dto/api-response';
import { api_dwb_uri } from '../../../shared/uri/api-dwb-uri';
import { Customer } from '../_model/customer';
import { DtoCustomerList } from '../_dto/DtoCustomerList';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private source = "/customer";

  constructor(
    private http: HttpClient
  ) { }

  createCustomer(customer: any): Observable<HttpResponse<ApiResponse>> {
    return this.http.post<ApiResponse>(api_dwb_uri + this.source, customer, { observe: 'response' });
  }

  enableCustomer(id: number): Observable<HttpResponse<ApiResponse>> {
    return this.http.put<ApiResponse>(api_dwb_uri + this.source + "/" + id + "/activate", null, { observe: 'response' });
  }

  deleteAccount(): Observable<HttpResponse<ApiResponse>> {
    return this.http.delete<ApiResponse>(api_dwb_uri + this.source, { observe: 'response' });
  }

  disableCustomer(id: number): Observable<HttpResponse<ApiResponse>> {
    return this.http.delete<ApiResponse>(api_dwb_uri + this.source + "/" + id, { observe: 'response' });
  }

  getCustomer(rfc: string): Observable<HttpResponse<Customer>> {
    return this.http.get<Customer>(api_dwb_uri + this.source + "/" + rfc, { observe: 'response' });
  }

  getCustomers(): Observable<HttpResponse<DtoCustomerList[]>> {
    return this.http.get<DtoCustomerList[]>(api_dwb_uri + this.source, { observe: 'response' });
  }

  updateCustomer(customer: any, id: number): Observable<HttpResponse<ApiResponse>> {
    return this.http.put<ApiResponse>(api_dwb_uri + this.source + "/" + id, customer, { observe: 'response' });
  }
}

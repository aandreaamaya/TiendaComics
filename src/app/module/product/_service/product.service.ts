import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../commons/_dto/api-response';
import { api_dwb_uri } from '../../../shared/uri/api-dwb-uri';
import { Product } from '../_model/product';
import { DtoProductList } from '../_dto/dto-product-list';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private source = "/product";

  constructor(
    private http: HttpClient
  ) { }

  createProduct(product: any): Observable<HttpResponse<ApiResponse>> {
    return this.http.post<ApiResponse>(api_dwb_uri + this.source, product, { observe: 'response' });
  }

  disableProduct(id: number): Observable<HttpResponse<ApiResponse>> {
    return this.http.delete<ApiResponse>(api_dwb_uri + this.source + "/" + id, { observe: 'response' });
  }

  enableProduct(id: number): Observable<HttpResponse<ApiResponse>> {
    return this.http.put<ApiResponse>(api_dwb_uri + this.source + "/" + id + "/activate", null, { observe: 'response' });
  }

  getProduct(gtin: string): Observable<HttpResponse<Product>> {
    return this.http.get<Product>(api_dwb_uri + this.source + "/" + gtin, { observe: 'response' });
  }

  getActiveProducts(): Observable<HttpResponse<DtoProductList[]>>{
    return this.http.get<DtoProductList[]>(api_dwb_uri + this.source + "/active", { observe: 'response' });
  }

  getProducts(): Observable<HttpResponse<DtoProductList[]>>{
    return this.http.get<DtoProductList[]>(api_dwb_uri + this.source, { observe: 'response' });
  }

  getProductsByCategory(category_id: number): Observable<HttpResponse<DtoProductList[]>>{
    return this.http.get<DtoProductList[]>(api_dwb_uri + this.source + "/category" + "/" + category_id, { observe: 'response' });
  }

  updateProduct(product: any, id: number): Observable<HttpResponse<ApiResponse>> {
    return this.http.put<ApiResponse>(api_dwb_uri + this.source + "/" + id, product, { observe: 'response' });
  }

  updateProductStock(gtin: string, stock: number): Observable<HttpResponse<ApiResponse>> {
    return this.http.put<ApiResponse>(api_dwb_uri + this.source + "/" + gtin + "/stock"+ "/" + stock, null, { observe: 'response' });
  }
}

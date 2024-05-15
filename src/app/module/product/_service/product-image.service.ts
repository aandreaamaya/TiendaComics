import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../commons/_dto/api-response';
import { api_dwb_uri } from '../../../shared/uri/api-dwb-uri';
import { ProductImage } from '../_model/product-image';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {

  private source = "/product-image";

  constructor(
    private http: HttpClient
  ) { }

  createProductImage(product_image: any): Observable<HttpResponse<ApiResponse>> {
    return this.http.post<ApiResponse>(api_dwb_uri + this.source, product_image, { observe: 'response' });
  }
  
  deleteProductImage(id: number): Observable<HttpResponse<ApiResponse>> {
    return this.http.delete<ApiResponse>(api_dwb_uri + this.source + "/" + id, { observe: 'response' });
  }
  
  getProductImages(product_id: number): Observable<HttpResponse<ProductImage[]>> {
    return this.http.get<ProductImage[]>(api_dwb_uri + this.source + "/" + product_id, { observe: 'response' });
  }
}

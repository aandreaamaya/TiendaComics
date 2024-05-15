import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../commons/_dto/api-response';
import { api_dwb_uri } from '../../../shared/uri/api-dwb-uri';
import { DtoCartDetails } from '../_dto/dto-cart-details';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private source = "/cart";

  constructor(
    private http: HttpClient
  ) { }

  addToCart(cart: any): Observable<HttpResponse<ApiResponse>> {
    return this.http.post<ApiResponse>(api_dwb_uri + this.source, cart, { observe: 'response' });
  }

  getCart(): Observable<HttpResponse<DtoCartDetails[]>> {
    return this.http.get<DtoCartDetails[]>(api_dwb_uri + this.source , { observe: 'response' });
  }

  /* REQUERIMIENTO 4. Implementar servicio Cart - función clearCart() */
  clearCart() {}

  /* REQUERIMIENTO 4. Implementar servicio Cart - función removeFromCart() */
  removeFromCart() {}
}

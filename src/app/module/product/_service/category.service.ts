import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../_model/category';
import { api_dwb_uri } from '../../../shared/uri/api-dwb-uri';
import { ApiResponse } from '../../commons/_dto/api-response';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private source = "/category";

  constructor(
    private http: HttpClient
  ) { }

  createCategory(category: any): Observable<HttpResponse<ApiResponse>> {
    return this.http.post<ApiResponse>(api_dwb_uri + this.source, category, { observe: 'response' });
  }

  disableCategory(id: number): Observable<HttpResponse<ApiResponse>> {
    return this.http.delete<ApiResponse>(api_dwb_uri + this.source + "/" + id, { observe: 'response' });
  }

  enableCategory(id: number): Observable<HttpResponse<ApiResponse>> {
    return this.http.put<ApiResponse>(api_dwb_uri + this.source + "/" + id + "/activate", null, { observe: 'response' });
  }

  getCategory(id: number): Observable<HttpResponse<Category>> {
    return this.http.get<Category>(api_dwb_uri + this.source + "/" + id, { observe: 'response' });
  }

  getActiveCategories(): Observable<HttpResponse<Category[]>>{
    return this.http.get<Category[]>(api_dwb_uri + this.source + "/active", { observe: 'response' });
  }

  getCategories(): Observable<HttpResponse<Category[]>>{
    return this.http.get<Category[]>(api_dwb_uri + this.source, { observe: 'response' });
  }

  updateCategory(category: any, id: number): Observable<HttpResponse<ApiResponse>> {
    return this.http.put<ApiResponse>(api_dwb_uri + this.source + "/" + id, category, { observe: 'response' });
  }

}

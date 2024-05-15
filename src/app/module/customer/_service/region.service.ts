import { Injectable } from '@angular/core';
import { Region } from '../_model/region';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { api_dwb_uri } from '../../../shared/uri/api-dwb-uri';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../commons/_dto/api-response';

@Injectable({
  providedIn: 'root'
})

export class RegionService {

  private source = "/region";

  constructor(
    private http: HttpClient
  ) { }

  createRegion(region: any): Observable<HttpResponse<ApiResponse>> {
    return this.http.post<ApiResponse>(api_dwb_uri + this.source, region, { observe: 'response' });
  }


  disableRegion(id: number): Observable<HttpResponse<ApiResponse>> {
    return this.http.delete<ApiResponse>(api_dwb_uri + this.source + "/" + id, { observe: 'response' });
  }


  enableRegion(id: number): Observable<HttpResponse<ApiResponse>> {
    return this.http.put<ApiResponse>(api_dwb_uri + this.source + "/" + id + "/activate", null, { observe: 'response' });
  }


  getRegion(id: number): Observable<HttpResponse<Region>> {
    return this.http.get<Region>(api_dwb_uri + this.source + "/" + id, { observe: 'response' });
  }


  getActiveRegions(): Observable<HttpResponse<Region[]>>{
    return this.http.get<Region[]>(api_dwb_uri + this.source + "/active", { observe: 'response' });
  }


  getRegions(): Observable<HttpResponse<Region[]>>{
    return this.http.get<Region[]>(api_dwb_uri + this.source, { observe: 'response' });
  }


  updateRegion(region: any, id: number): Observable<HttpResponse<ApiResponse>> {
    return this.http.put<ApiResponse>(api_dwb_uri + this.source + "/" + id, region, { observe: 'response' });
  }

}
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../_model/invoice';
import { api_dwb_uri } from '../../../shared/uri/api-dwb-uri';
import { DtoInvoiceList } from '../_dto/dto-invoice-list';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private source = "/invoice";

  constructor(
    private http: HttpClient
  ) { }

  getInvoice(id: number): Observable<HttpResponse<Invoice>> {
    return this.http.get<Invoice>(api_dwb_uri + this.source + "/" + id , { observe: 'response' });
  }

  getInvoices(): Observable<HttpResponse<DtoInvoiceList[]>> {
    return this.http.get<DtoInvoiceList[]>(api_dwb_uri + this.source, { observe: 'response' });
  }

  /* REQUERIMIENTO 4. Implementar servicio Invoice - función generateInvoice() */
  generateInvoice() {}
}

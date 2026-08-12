import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Historial } from '../models/historial';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  private api =
    `${environment.apiUrl}/historial`;

  constructor(
    private http: HttpClient
  ) {}

  listar(buscar: string = ''):
    Observable<Historial[]> {

    let params = new HttpParams();

    if (buscar.trim()) {
      params = params.set(
        'buscar',
        buscar.trim()
      );
    }

    return this.http.get<Historial[]>(
      this.api,
      { params }
    );
  }

  obtenerPdf(
    diagnosticoId: number
  ): Observable<Blob> {

    return this.http.get(
      `${environment.apiUrl}/diagnosticos/${diagnosticoId}/pdf`,
      {
        responseType: 'blob'
      }
    );
  }
}
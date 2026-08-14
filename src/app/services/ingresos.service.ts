import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IngresoEquipo } from '../models/ingreso';

@Injectable({providedIn:'root'})
export class IngresosService {
  private url = `${environment.apiUrl}/ingresos`;

  constructor(private http: HttpClient) {}

  listar(buscar: string = '') {
    let params = new HttpParams();

    if (buscar.trim()) {
      params = params.set('buscar', buscar.trim());
    }

    return this.http.get<IngresoEquipo[]>(this.url, { params });
  }

  buscarPorNumero(numeroIngreso: string) {
    return this.http.get<IngresoEquipo>(
      `${this.url}/buscar/${encodeURIComponent(numeroIngreso.trim())}`
    );
  }

  crear(x: IngresoEquipo) {
    return this.http.post(
      this.url,
      x,
      { responseType: 'blob' }
    );
  }

  descargarPdf(id: number) {
    return this.http.get(
      `${this.url}/${id}/pdf`,
      { responseType: 'blob' }
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IngresoEquipo } from '../models/ingreso';

@Injectable({providedIn:'root'})
export class IngresosService {
  private url = `${environment.apiUrl}/ingresos`;
  constructor(private http: HttpClient) {}
  listar() { return this.http.get<IngresoEquipo[]>(this.url); }
  buscarPorNumero(numeroIngreso: string) {
    return this.http.get<IngresoEquipo>(`${this.url}/buscar/${encodeURIComponent(numeroIngreso.trim())}`);
  }
  crear(x: IngresoEquipo) { return this.http.post<IngresoEquipo>(this.url, x); }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Diagnostico } from '../models/diagnostico';
import { environment } from '../../environments/environment';

@Injectable({providedIn:'root'})
export class DiagnosticosService {
  private readonly url = `${environment.apiUrl}/diagnosticos`;
  constructor(private http: HttpClient) {}

  listar(): Observable<Diagnostico[]> { return this.http.get<Diagnostico[]>(this.url); }

  crearYGenerarPdf(data: Diagnostico, evidencia?: File): Observable<Blob> {
    const form = new FormData();
    Object.entries(data).forEach(([key, value]) => form.append(key, String(value ?? '')));
    if (evidencia) form.append('evidencia', evidencia);
    return this.http.post(`${this.url}/generar-pdf`, form, { responseType: 'blob' });
  }
}

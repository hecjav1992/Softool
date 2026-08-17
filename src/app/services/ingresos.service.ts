import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { IngresoEquipo } from '../models/ingreso';

@Injectable({
  providedIn: 'root'
})
export class IngresosService {

  private api =
    `${environment.apiUrl}/ingresos`;

  constructor(
    private http: HttpClient
  ) {}

  listar(buscar: string = ''):
    Observable<IngresoEquipo[]> {

    const url = buscar.trim()
      ? `${this.api}?buscar=${encodeURIComponent(buscar.trim())}`
      : this.api;

    return this.http.get<IngresoEquipo[]>(url);
  }

  buscarPorNumero(
    numeroIngreso: string
  ): Observable<IngresoEquipo> {

    return this.http.get<IngresoEquipo>(
      `${this.api}/buscar/${encodeURIComponent(numeroIngreso)}`
    );
  }

  crear(
    ingreso: IngresoEquipo,
    evidencia: File | null
  ): Observable<Blob> {

    const formData =
      new FormData();

    formData.append(
      'numeroIngreso',
      ingreso.numeroIngreso
    );

    formData.append(
      'fechaIngreso',
      ingreso.fechaIngreso
    );

    formData.append(
      'cliente',
      ingreso.cliente
    );

    formData.append(
      'cedula',
      ingreso.cedula
    );

    formData.append(
      'telefono',
      ingreso.telefono
    );

    formData.append(
      'correo',
      ingreso.correo ?? ''
    );

    formData.append(
      'tipoEquipo',
      ingreso.tipoEquipo
    );

    formData.append(
      'marca',
      ingreso.marca
    );

    formData.append(
      'modelo',
      ingreso.modelo
    );

    formData.append(
      'imeiSerie',
      ingreso.imeiSerie ?? ''
    );

    formData.append(
      'accesorios',
      ingreso.accesorios ?? ''
    );

    formData.append(
      'estadoFisico',
      ingreso.estadoFisico ?? ''
    );

    formData.append(
      'fallaReportada',
      ingreso.fallaReportada ?? ''
    );

    formData.append(
      'observaciones',
      ingreso.observaciones ?? ''
    );

    if (evidencia) {
      formData.append(
        'evidencia',
        evidencia,
        evidencia.name
      );
    }

    return this.http.post(
      this.api,
      formData,
      {
        responseType: 'blob'
      }
    );
  }

  descargarPdf(
    id: number
  ): Observable<Blob> {

    return this.http.get(
      `${this.api}/${id}/pdf`,
      {
        responseType: 'blob'
      }
    );
  }
}
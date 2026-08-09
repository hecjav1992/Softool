import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BiResumen } from '../models/bi-resumen';

@Injectable({ providedIn: 'root' })
export class BiService {
  private http = inject(HttpClient);
  private api = `${environment.apiUrl}/inteligencia-negocio`;

  resumen(): Observable<BiResumen> {
    return this.http.get<BiResumen>(`${this.api}/resumen`);
  }
}

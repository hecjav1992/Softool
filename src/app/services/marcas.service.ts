import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Marca } from '../models/marca';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {

  private api =
    `${environment.apiUrl}/marcas`;

  constructor(
    private http: HttpClient
  ) {}

  listar(): Observable<Marca[]> {
    return this.http.get<Marca[]>(
      this.api
    );
  }
}
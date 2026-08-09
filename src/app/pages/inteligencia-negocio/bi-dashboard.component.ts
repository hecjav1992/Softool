import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { BiResumen } from '../../models/bi-resumen';
import { BiService } from '../../services/bi.service';

@Component({
  selector: 'app-bi-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bi-dashboard.component.html',
  styleUrl: './bi-dashboard.component.css'
})
export class BiDashboardComponent implements OnInit {
  private biService = inject(BiService);

  data?: BiResumen;
  cargando = true;
  error = '';

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.error = '';

    this.biService.resumen().subscribe({
      next: data => {
        this.data = data;
        this.cargando = false;
      },
      error: err => {
        this.error =
          err?.error?.message ??
          'No se pudo cargar el módulo de inteligencia de negocio.';
        this.cargando = false;
      }
    });
  }

  maxTipo(): number {
    return Math.max(1, ...(this.data?.porTipoEquipo.map(x => x.cantidad) ?? [1]));
  }

  maxMarca(): number {
    return Math.max(1, ...(this.data?.porMarca.map(x => x.cantidad) ?? [1]));
  }

  maxMes(): number {
    return Math.max(1, ...(this.data?.diagnosticosPorMes.map(x => x.cantidad) ?? [1]));
  }

  ancho(valor: number, maximo: number): number {
    return Math.max(4, Math.round((valor / maximo) * 100));
  }
}

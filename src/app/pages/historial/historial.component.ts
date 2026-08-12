import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  DomSanitizer,
  SafeResourceUrl
} from '@angular/platform-browser';

import { Historial } from '../../models/historial';
import { HistorialService } from '../../services/historial.service';

@Component({
  selector: 'app-historial',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent
  implements OnInit, OnDestroy {

  registros: Historial[] = [];

  buscar = '';

  cargando = false;

  mensaje = '';

  pdfUrl?: SafeResourceUrl;

  pdfBlobUrl?: string;

  pdfAbierto = false;

  registroSeleccionado?: Historial;

  constructor(
    private historialService: HistorialService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {

    this.cargando = true;

    this.historialService
      .listar(this.buscar)
      .subscribe({

        next: datos => {

          this.registros = datos;

          this.cargando = false;
        },

        error: () => {

          this.mensaje =
            'No se pudo cargar el historial.';

          this.cargando = false;
        }

      });
  }

  buscarRegistros(): void {
    this.cargar();
  }

  limpiarBusqueda(): void {

    this.buscar = '';

    this.cargar();
  }

  visualizarPdf(
    registro: Historial
  ): void {

    if (!registro.diagnosticoId) {
      return;
    }

    this.registroSeleccionado = registro;

    this.historialService
      .obtenerPdf(
        registro.diagnosticoId
      )
      .subscribe({

        next: blob => {

          if (this.pdfBlobUrl) {
            URL.revokeObjectURL(
              this.pdfBlobUrl
            );
          }

          this.pdfBlobUrl =
            URL.createObjectURL(blob);

          this.pdfUrl =
            this.sanitizer
              .bypassSecurityTrustResourceUrl(
                this.pdfBlobUrl
              );

          this.pdfAbierto = true;
        },

        error: () => {

          this.mensaje =
            'No se pudo abrir el PDF.';
        }

      });
  }

  descargarPdf(
    registro: Historial
  ): void {

    if (!registro.diagnosticoId) {
      return;
    }

    this.historialService
      .obtenerPdf(
        registro.diagnosticoId
      )
      .subscribe({

        next: blob => {

          const url =
            URL.createObjectURL(blob);

          const enlace =
            document.createElement('a');

          enlace.href = url;

          enlace.download =
            `${registro.numeroInforme ?? 'diagnostico'}.pdf`;

          enlace.click();

          URL.revokeObjectURL(url);
        },

        error: () => {

          this.mensaje =
            'No se pudo descargar el PDF.';
        }

      });
  }

  cerrarPdf(): void {

    this.pdfAbierto = false;

    this.pdfUrl = undefined;

    if (this.pdfBlobUrl) {

      URL.revokeObjectURL(
        this.pdfBlobUrl
      );

      this.pdfBlobUrl = undefined;
    }
  }

  ngOnDestroy(): void {

    if (this.pdfBlobUrl) {

      URL.revokeObjectURL(
        this.pdfBlobUrl
      );
    }
  }
}
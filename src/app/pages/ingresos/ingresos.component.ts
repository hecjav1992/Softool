import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IngresosService } from '../../services/ingresos.service';
import { IngresoEquipo } from '../../models/ingreso';
import { Marca } from '../../models/marca';
import { MarcasService } from '../../services/marcas.service';

@Component({
  selector: 'app-ingresos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {
  lista: IngresoEquipo[] = [];
  mensaje = '';
  error = '';
  busqueda = '';
  cargando = false;
  guardando = false;
  marcas: Marca[] = [];
  evidencia: File | null = null;
  evidenciaPreview: string | null = null;

  modelo: IngresoEquipo = this.nuevo();

  constructor(private api: IngresosService, private marcasService: MarcasService) {}

  ngOnInit(): void {
     this.cargarMarcas();
    this.cargar();
  }

  cargarMarcas(): void {

  this.marcasService
    .listar()
    .subscribe({

      next: datos => {
        this.marcas = datos;
      },

      error: error => {
        console.error(
          'Error cargando marcas',
          error
        );
      }

    });

}

 nuevo(): IngresoEquipo {
  return {
    numeroIngreso:
      `ING-${new Date().getFullYear()}-${Date.now().toString().slice(-5)}`,

    fechaIngreso:
      new Date().toISOString().slice(0, 10),

    cliente: '',
    cedula: '',
    telefono: '',
    correo: '',

    tipoEquipo: 'Celular',

    marca: '',
    modelo: '',
    imeiSerie: '',

    accesorios: '',
    estadoFisico: '',
    fallaReportada: '',
    observaciones: ''
  };
}

seleccionarEvidencia(
  event: Event
): void {

  const input =
    event.target as HTMLInputElement;

  const archivo =
    input.files?.[0];

  if (!archivo) {
    return;
  }

  const permitidos = [
    'image/jpeg',
    'image/png',
    'image/webp'
  ];

  if (!permitidos.includes(archivo.type)) {

    this.error =
      'La evidencia debe ser JPG, PNG o WEBP.';

    input.value = '';

    return;
  }

  if (archivo.size > 8_000_000) {

    this.error =
      'La evidencia no puede superar los 8 MB.';

    input.value = '';

    return;
  }

  this.error = '';

  this.evidencia = archivo;

  if (this.evidenciaPreview) {
    URL.revokeObjectURL(
      this.evidenciaPreview
    );
  }

  this.evidenciaPreview =
    URL.createObjectURL(archivo);
}

  cargar(): void {
    this.cargando = true;
    this.error = '';

    this.api.listar(this.busqueda).subscribe({
      next: r => {
        this.lista = r;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los equipos registrados.';
        this.cargando = false;
      }
    });
  }

  buscar(): void {
    this.cargar();
  }

  limpiarBusqueda(): void {
    this.busqueda = '';
    this.cargar();
  }

guardar(): void {

  this.guardando = true;

  this.mensaje = '';
  this.error = '';

  const numeroIngreso =
    this.modelo.numeroIngreso;

  this.api
    .crear(
      this.modelo,
      this.evidencia
    )
    .subscribe({

      next: blob => {

        this.descargarBlob(
          blob,
          `${numeroIngreso}.pdf`
        );

        this.mensaje =
          'Equipo ingresado correctamente. Se descargó el comprobante PDF.';

        this.modelo =
          this.nuevo();

        this.evidencia = null;

        if (this.evidenciaPreview) {

          URL.revokeObjectURL(
            this.evidenciaPreview
          );

          this.evidenciaPreview = null;
        }

        this.guardando = false;

        this.cargar();
      },

      error: async err => {

        this.error =
          await this.obtenerMensajeError(
            err
          );

        this.guardando = false;
      }
    });
}

  descargarIngreso(x: IngresoEquipo, event?: Event): void {
    event?.stopPropagation();

    if (!x.id) {
      this.error = 'No se encontró el identificador del ingreso.';
      return;
    }

    this.error = '';

    this.api.descargarPdf(x.id).subscribe({
      next: blob => this.descargarBlob(blob, `${x.numeroIngreso}.pdf`),
      error: () => this.error = 'No se pudo descargar el comprobante de ingreso.'
    });
  }

  private descargarBlob(blob: Blob, nombre: string): void {
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement('a');

    enlace.href = url;
    enlace.download = nombre;
    document.body.appendChild(enlace);
    enlace.click();
    enlace.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  private async obtenerMensajeError(err: any): Promise<string> {
    try {
      if (err?.error instanceof Blob) {
        const texto = await err.error.text();
        const json = JSON.parse(texto);
        return json?.message ?? 'No se pudo registrar el equipo.';
      }

      return err?.error?.message ?? err?.error ?? 'No se pudo registrar el equipo.';
    } catch {
      return 'No se pudo registrar el equipo.';
    }
  }
}

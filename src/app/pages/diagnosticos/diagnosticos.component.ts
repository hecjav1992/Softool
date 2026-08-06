import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { finalize, switchMap } from 'rxjs';
import { DiagnosticosService } from '../../services/diagnosticos.service';
import { IngresosService } from '../../services/ingresos.service';
import { Diagnostico } from '../../models/diagnostico';

@Component({
  selector: 'app-diagnosticos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './diagnosticos.component.html',
  styleUrl: './diagnosticos.component.css'
})
export class DiagnosticosComponent {
  enviando = false;
  mensaje = '';
  evidencia?: File;
  vistaPrevia?: string;
  form: Diagnostico = this.nuevoFormulario();

  constructor(
    private diagnosticosService: DiagnosticosService,
    private ingresosService: IngresosService
  ) {}

  seleccionarArchivo(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.evidencia = input.files?.[0];

    if (!this.evidencia) {
      this.vistaPrevia = undefined;
      return;
    }

    const reader = new FileReader();
    reader.onload = () => this.vistaPrevia = String(reader.result);
    reader.readAsDataURL(this.evidencia);
  }

  generarPdf(formulario: NgForm): void {
    if (formulario.invalid) {
      formulario.control.markAllAsTouched();
      this.mensaje = 'Complete los campos obligatorios antes de generar el PDF.';
      return;
    }

    const numeroIngreso = this.form.numeroIngreso.trim();
    if (!numeroIngreso) {
      this.mensaje = 'Ingrese el número de ingreso del equipo.';
      return;
    }

    this.enviando = true;
    this.mensaje = 'Verificando que el equipo esté registrado…';

    // 1. Verifica el equipo.
    // 2. Carga sus datos oficiales.
    // 3. Guarda el diagnóstico y genera el PDF.
    this.ingresosService.buscarPorNumero(numeroIngreso)
      .pipe(
        switchMap(ingreso => {
          this.form.cliente = ingreso.cliente;
          this.form.telefono = ingreso.telefono;
          this.form.marca = ingreso.marca;
          this.form.modelo = ingreso.modelo;
          this.form.imeiSerie = ingreso.imeiSerie ?? '';
          this.mensaje = 'Equipo encontrado. Guardando diagnóstico y generando PDF…';

          return this.diagnosticosService.crearYGenerarPdf(
            this.form,
            this.evidencia
          );
        }),
        finalize(() => this.enviando = false)
      )
      .subscribe({
        next: blob => {
          const url = URL.createObjectURL(blob);
          const enlace = document.createElement('a');
          enlace.href = url;
          enlace.download = `${this.form.numeroInforme || 'diagnostico'}.pdf`;
          enlace.click();
          URL.revokeObjectURL(url);
          this.mensaje = 'Diagnóstico guardado y PDF generado correctamente.';
        },
        error: async error => {
          this.mensaje = await this.obtenerMensajeError(error);
        }
      });
  }

  limpiar(formulario: NgForm): void {
    formulario.resetForm(this.nuevoFormulario());
    this.evidencia = undefined;
    this.vistaPrevia = undefined;
    this.mensaje = '';
  }

  private async obtenerMensajeError(error: any): Promise<string> {
    if (error?.status === 404) {
      return 'El equipo no existe. Regístrelo primero en el módulo Ingreso de equipos.';
    }

    if (error?.error instanceof Blob) {
      try {
        const contenido = await error.error.text();
        const data = JSON.parse(contenido);
        return data.message ?? data.mensaje ?? 'No se pudo generar el PDF.';
      } catch {
        return 'No se pudo generar el PDF.';
      }
    }

    return error?.error?.message
      ?? error?.error?.mensaje
      ?? 'No se pudo guardar el diagnóstico ni generar el PDF.';
  }

  private nuevoFormulario(): Diagnostico {
    return {
      numeroIngreso: '',
      numeroInforme: '',
      fecha: new Date().toISOString().slice(0, 10),
      cliente: '',
      telefono: '',
      marca: '',
      modelo: '',
      imeiSerie: '',
      diagnosticoTecnico: '',
      recomendacion: ''
    };
  }
}

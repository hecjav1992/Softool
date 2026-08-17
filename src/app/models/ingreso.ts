export interface IngresoEquipo {
  id?: number;

  numeroIngreso: string;
  fechaIngreso: string;

  cliente: string;
  cedula: string;

  telefono: string;
  correo: string;

  tipoEquipo: string;
  marca: string;
  modelo: string;

  imeiSerie: string;

  accesorios: string;
  estadoFisico: string;
  fallaReportada: string;
  observaciones: string;

  estado?: string;
}
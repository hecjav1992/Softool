export interface Historial {
  ingresoId: number;

  numeroIngreso: string;
  tipoEquipo: string;

  cliente: string;
  telefono: string;

  marca: string;
  modelo: string;
  imeiSerie: string;

  estado: string;

  diagnosticoId?: number;
  numeroInforme?: string;

  tieneDiagnostico: boolean;
  tienePdf: boolean;
}
export interface BiItem {
  nombre: string;
  cantidad: number;
}

export interface BiMes {
  periodo: string;
  etiqueta: string;
  cantidad: number;
}

export interface BiKpis {
  totalIngresos: number;
  totalDiagnosticos: number;
  diagnosticados: number;
  pendientes: number;
  tasaDiagnostico: number;
}

export interface BiResumen {
  generadoEnUtc: string;
  kpis: BiKpis;
  porTipoEquipo: BiItem[];
  porMarca: BiItem[];
  porEstado: BiItem[];
  diagnosticosPorMes: BiMes[];
}

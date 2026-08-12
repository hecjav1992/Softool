import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BiDashboardComponent } from './pages/inteligencia-negocio/bi-dashboard.component';
import { IngresosComponent } from './pages/ingresos/ingresos.component';
import { DiagnosticosComponent } from './pages/diagnosticos/diagnosticos.component';
import {HistorialComponent} from './pages/historial/historial.component';

import { ShellComponent } from './layout/shell.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [

  // LOGIN
  {
    path: 'login',
    component: LoginComponent
  },

  // SISTEMA PROTEGIDO
  {
    path: '',
    component: ShellComponent,
    canActivate: [authGuard],

    children: [

      // DASHBOARD
      {
        path: '',
        component: DashboardComponent
      },

      // INGRESO DE EQUIPOS
      {
        path: 'ingresos',
        component: IngresosComponent
      },

      // DIAGNÓSTICOS
      {
        path: 'diagnosticos',
        component: DiagnosticosComponent
      },

      // INTELIGENCIA DE NEGOCIO
      {
        path: 'inteligencia-negocio',
        component: BiDashboardComponent
      },
      {
        path: 'historial',
        component: HistorialComponent
     }

    ]
  },

  // CUALQUIER RUTA DESCONOCIDA
  {
    path: '**',
    redirectTo: ''
  }

];

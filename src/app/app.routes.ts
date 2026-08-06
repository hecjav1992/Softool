import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IngresosComponent } from './pages/ingresos/ingresos.component';
import { DiagnosticosComponent } from './pages/diagnosticos/diagnosticos.component';
import { ShellComponent } from './layout/shell.component';
import { authGuard } from './services/auth.guard';
export const routes: Routes = [
 {path:'login',component:LoginComponent},
 {path:'',component:ShellComponent,canActivate:[authGuard],children:[
   {path:'',component:DashboardComponent},
   {path:'ingresos',component:IngresosComponent},
   {path:'diagnosticos',component:DiagnosticosComponent}
 ]},
 {path:'**',redirectTo:''}
];

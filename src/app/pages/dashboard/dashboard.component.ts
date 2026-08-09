import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],

  template: `
    <h1>Bienvenido a EASY DATA</h1>

    <p class="sub">
      Seleccione el proceso que desea realizar.
    </p>

    <div class="cards">

      <a routerLink="/ingresos">
        <span>01</span>

        <h2>Ingreso de equipos</h2>

        <p>
          Registrar cliente, equipo, accesorios,
          falla reportada y condición física.
        </p>

        <b>Abrir módulo →</b>
      </a>

      <a routerLink="/diagnosticos">
        <span>02</span>

        <h2>Diagnóstico de equipos</h2>

        <p>
          Documentar revisión técnica,
          recomendación y generar el informe PDF.
        </p>

        <b>Abrir módulo →</b>
      </a>

      <a routerLink="/inteligencia-negocio">
        <span>03</span>

        <h2>Inteligencia de Negocio</h2>

        <p>
          Visualizar indicadores, equipos ingresados,
          diagnósticos, marcas, tipos de equipos
          y estadísticas del taller.
        </p>

        <b>Ver indicadores →</b>
      </a>

    </div>
  `,

  styles: [`
    h1 {
      margin-bottom: 4px;
    }

    .sub {
      color: #64748b;
    }

    .cards {
      display: grid;
      grid-template-columns: repeat(
        auto-fit,
        minmax(280px, 1fr)
      );
      gap: 22px;
      margin-top: 28px;
    }

    .cards a {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 15px;
      padding: 26px;
      text-decoration: none;
      color: #172033;
      box-shadow: 0 8px 25px #14345a12;
      transition: 0.2s ease;
    }

    .cards a:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 30px #14345a20;
    }

    span {
      display: inline-grid;
      place-items: center;
      width: 45px;
      height: 45px;
      border-radius: 12px;
      background: #e8f1fc;
      color: #174f8f;
      font-weight: 800;
    }

    p {
      line-height: 1.6;
      color: #64748b;
    }

    b {
      color: #174f8f;
    }
  `]
})

export class DashboardComponent {}
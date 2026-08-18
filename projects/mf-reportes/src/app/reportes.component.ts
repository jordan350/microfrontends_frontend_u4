import { Component } from '@angular/core';

@Component({
  selector: 'fin-reportes',
  standalone: true,
  template: `
    <article class="mf-panel">
      <div class="mf-header">
        <div>
          <span class="badge">Microfrontend remoto</span>
          <h2>Reportes y analítica</h2>
          <p>Indicadores ejecutivos y consulta histórica de solo lectura.</p>
        </div>
        <strong>Equipo Analítica</strong>
      </div>

      <div class="grid">
        <div class="card">LCP estimado<strong>1.6 s</strong></div>
        <div class="card">Errores UI<strong>0.4%</strong></div>
        <div class="card">Consultas/día<strong>2.340</strong></div>
      </div>

      <div class="chart" role="img" aria-label="Actividad mensual: enero 40, febrero 68, marzo 52, abril 84, mayo 61 y junio 76 por ciento">
        @for (item of activity; track item.month) {
          <div class="bar" [style.height.%]="item.value"><span>{{ item.month }}</span></div>
        }
      </div>
    </article>
  `
})
export class ReportesComponent {
  readonly activity = [
    {month: 'Ene', value: 40}, {month: 'Feb', value: 68}, {month: 'Mar', value: 52},
    {month: 'Abr', value: 84}, {month: 'May', value: 61}, {month: 'Jun', value: 76}
  ];
}

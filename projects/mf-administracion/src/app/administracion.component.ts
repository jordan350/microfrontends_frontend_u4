import { Component } from '@angular/core';

@Component({
  selector: 'fin-administracion',
  standalone: true,
  template: `
    <article class="mf-panel">
      <div class="mf-header">
        <div>
          <span class="badge">Microfrontend remoto</span>
          <h2>Administración y gobierno</h2>
          <p>Roles, parámetros y contratos compartidos.</p>
        </div>
        <strong>Equipo Plataforma</strong>
      </div>

      <div class="grid">
        <div class="card">Roles activos<strong>12</strong></div>
        <div class="card">Contratos API<strong>8</strong></div>
        <div class="card">Versiones MF<strong>3</strong></div>
      </div>

      <table>
        <thead><tr><th>Contrato</th><th>Versión</th><th>Responsable</th></tr></thead>
        <tbody>
          <tr><td>auth-context</td><td>1.2.0</td><td>Plataforma</td></tr>
          <tr><td>ui-events</td><td>1.1.0</td><td>Arquitectura Front-End</td></tr>
          <tr><td>design-tokens</td><td>2.0.0</td><td>UX/UI</td></tr>
        </tbody>
      </table>
    </article>
  `
})
export class AdministracionComponent {}

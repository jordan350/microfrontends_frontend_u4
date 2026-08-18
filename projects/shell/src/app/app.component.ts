import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { OPERATION_SELECTED_EVENT, OperationSelectedDetail } from '@finops/contracts';

@Component({
  selector: 'fin-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="app-shell">
      <aside class="sidebar" aria-label="Navegación principal">
        <div class="brand">FinOps</div>
        <a class="nav" routerLink="/operaciones" routerLinkActive="active">Operaciones</a>
        <a class="nav" routerLink="/reportes" routerLinkActive="active">Reportes</a>
        <a class="nav" routerLink="/administracion" routerLinkActive="active">Administración</a>
      </aside>

      <main class="shell-main">
        <header class="topbar">
          <div>
            <p class="eyebrow">Shell Angular | Module Federation</p>
            <h1>Arquitectura Front-End por microfrontends</h1>
          </div>
          <span class="runtime-state">Remotos activos: 3 | Contrato UI v1</span>
        </header>

        <router-outlet />
      </main>
    </div>

    @if (notification()) {
      <div class="toast" role="status" aria-live="polite">{{ notification() }}</div>
    }
  `
})
export class AppComponent {
  readonly notification = signal('');

  @HostListener(`window:${OPERATION_SELECTED_EVENT}`, ['$event'])
  onOperationSelected(event: Event): void {
    const detail = (event as CustomEvent<OperationSelectedDetail>).detail;
    this.notification.set(`Shell recibió ${detail.operationId} desde ${detail.source}`);
    window.setTimeout(() => this.notification.set(''), 3500);
  }
}

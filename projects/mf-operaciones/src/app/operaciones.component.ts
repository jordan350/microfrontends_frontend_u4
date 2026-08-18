import { Component, computed, signal } from '@angular/core';
import { OPERATION_SELECTED_EVENT, OperationSelectedDetail } from '@finops/contracts';

interface Operation {
  id: string;
  cliente: string;
  valor: string;
  estado: 'Validada' | 'Pendiente';
}

@Component({
  selector: 'fin-operaciones',
  standalone: true,
  template: `
    <article class="mf-panel">
      <div class="mf-header">
        <div>
          <span class="badge">Microfrontend remoto</span>
          <h2>Operaciones transaccionales</h2>
          <p>Captura, validación y seguimiento operativo.</p>
        </div>
        <strong>Equipo Transaccional</strong>
      </div>

      <div class="grid">
        <div class="card">Transacciones<strong>128</strong></div>
        <div class="card">Validación automática<strong>94%</strong></div>
        <div class="card">Tiempo promedio<strong>1.7 s</strong></div>
      </div>

      <div class="toolbar">
        <label class="field">Buscar
          <input type="search" placeholder="Cliente o transacción" (input)="onSearch($event)">
        </label>
        <label class="field">Estado
          <select (change)="onStatus($event)">
            <option value="">Todos</option>
            <option value="Validada">Validada</option>
            <option value="Pendiente">Pendiente</option>
          </select>
        </label>
      </div>

      <table>
        <thead><tr><th>ID</th><th>Cliente</th><th>Valor</th><th>Estado</th><th>Acción</th></tr></thead>
        <tbody>
          @for (item of filteredOperations(); track item.id) {
            <tr>
              <td>{{ item.id }}</td><td>{{ item.cliente }}</td><td>{{ item.valor }}</td>
              <td [class.ok]="item.estado === 'Validada'" [class.warn]="item.estado === 'Pendiente'">{{ item.estado }}</td>
              <td><button class="link-button" type="button" (click)="selectOperation(item.id)">Notificar Shell</button></td>
            </tr>
          }
        </tbody>
      </table>
    </article>
  `
})
export class OperacionesComponent {
  private readonly term = signal('');
  private readonly status = signal('');
  private readonly operations: Operation[] = [
    {id: 'TRX-1048', cliente: 'Andes Retail', valor: '$ 18.400.000', estado: 'Validada'},
    {id: 'TRX-1051', cliente: 'Norte Salud', valor: '$ 7.920.000', estado: 'Pendiente'},
    {id: 'TRX-1054', cliente: 'Litoral Cargo', valor: '$ 12.100.000', estado: 'Validada'}
  ];

  readonly filteredOperations = computed(() => {
    const term = this.term().toLowerCase();
    const status = this.status();
    return this.operations.filter(item =>
      (!status || item.estado === status) &&
      (!term || item.id.toLowerCase().includes(term) || item.cliente.toLowerCase().includes(term))
    );
  });

  onSearch(event: Event): void { this.term.set((event.target as HTMLInputElement).value); }
  onStatus(event: Event): void { this.status.set((event.target as HTMLSelectElement).value); }

  selectOperation(operationId: string): void {
    const detail: OperationSelectedDetail = {contractVersion: '1.0.0', operationId, source: 'mf-operaciones'};
    window.dispatchEvent(new CustomEvent(OPERATION_SELECTED_EVENT, {detail}));
  }
}

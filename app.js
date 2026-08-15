const host = document.querySelector("#microfrontend-host");
const state = document.querySelector("#runtime-state");
const navButtons = document.querySelectorAll("[data-route]");

const operations = [
  { id: "TRX-1048", cliente: "Andes Retail", valor: "$ 18.400.000", estado: "Validada" },
  { id: "TRX-1051", cliente: "Norte Salud", valor: "$ 7.920.000", estado: "Pendiente" },
  { id: "TRX-1054", cliente: "Litoral Cargo", valor: "$ 12.100.000", estado: "Validada" }
];

const microfrontends = {
  operaciones: {
    label: "Operaciones",
    owner: "Equipo Transaccional",
    render() {
      return `
        <article class="mf-panel">
          <div class="mf-header">
            <div>
              <span class="badge">Microfrontend independiente</span>
              <h2>Operaciones transaccionales</h2>
              <p>Dominio responsable de captura, validación y seguimiento operativo.</p>
            </div>
            <strong>${this.owner}</strong>
          </div>
          <div class="grid">
            <div class="card">Transacciones<strong>128</strong></div>
            <div class="card">Validación automática<strong>94%</strong></div>
            <div class="card">Tiempo promedio<strong>1.7 s</strong></div>
          </div>
          <div class="toolbar">
            <input id="search" placeholder="Buscar cliente o transacción">
            <select id="filter">
              <option value="">Todos los estados</option>
              <option value="Validada">Validada</option>
              <option value="Pendiente">Pendiente</option>
            </select>
          </div>
          <table>
            <thead><tr><th>ID</th><th>Cliente</th><th>Valor</th><th>Estado</th></tr></thead>
            <tbody id="rows"></tbody>
          </table>
        </article>`;
    },
    mount() {
      const rows = document.querySelector("#rows");
      const search = document.querySelector("#search");
      const filter = document.querySelector("#filter");
      const paint = () => {
        const term = search.value.toLowerCase();
        const status = filter.value;
        rows.innerHTML = operations
          .filter(item => (!status || item.estado === status))
          .filter(item => item.id.toLowerCase().includes(term) || item.cliente.toLowerCase().includes(term))
          .map(item => `<tr><td>${item.id}</td><td>${item.cliente}</td><td>${item.valor}</td><td class="${item.estado === "Validada" ? "ok" : "warn"}">${item.estado}</td></tr>`)
          .join("");
      };
      search.addEventListener("input", paint);
      filter.addEventListener("change", paint);
      paint();
    }
  },
  reportes: {
    label: "Reportes",
    owner: "Equipo Analítica",
    render() {
      return `
        <article class="mf-panel">
          <div class="mf-header">
            <div>
              <span class="badge">Microfrontend independiente</span>
              <h2>Reportes y analítica</h2>
              <p>Dominio orientado a indicadores ejecutivos y consulta histórica.</p>
            </div>
            <strong>${this.owner}</strong>
          </div>
          <div class="grid">
            <div class="card">LCP estimado<strong>1.6 s</strong></div>
            <div class="card">Errores UI<strong>0.4%</strong></div>
            <div class="card">Consultas/día<strong>2.340</strong></div>
          </div>
          <div class="chart" aria-label="Gráfico simulado de actividad">
            <div class="bar" style="height: 40%"></div>
            <div class="bar" style="height: 68%"></div>
            <div class="bar" style="height: 52%"></div>
            <div class="bar" style="height: 84%"></div>
            <div class="bar" style="height: 61%"></div>
            <div class="bar" style="height: 76%"></div>
          </div>
        </article>`;
    },
    mount() {}
  },
  admin: {
    label: "Administración",
    owner: "Equipo Plataforma",
    render() {
      return `
        <article class="mf-panel">
          <div class="mf-header">
            <div>
              <span class="badge">Microfrontend independiente</span>
              <h2>Administración y gobierno</h2>
              <p>Dominio para roles, parámetros y contratos compartidos.</p>
            </div>
            <strong>${this.owner}</strong>
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
        </article>`;
    },
    mount() {}
  }
};

function loadMicrofrontend(route) {
  const mf = microfrontends[route];
  host.innerHTML = mf.render();
  mf.mount();
  state.textContent = `MF activo: ${mf.label}`;
  navButtons.forEach(btn => btn.classList.toggle("active", btn.dataset.route === route));
}

navButtons.forEach(btn => btn.addEventListener("click", () => loadMicrofrontend(btn.dataset.route)));
loadMicrofrontend("operaciones");

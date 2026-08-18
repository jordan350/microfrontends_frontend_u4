import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const manifestPath = resolve(root, 'projects/shell/src/assets/mf.manifest.json');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const workspace = JSON.parse(readFileSync(resolve(root, 'angular.json'), 'utf8'));

const remotes = [
  {name: 'mfOperaciones', folder: 'mf-operaciones', component: 'operaciones.component.ts', port: 4201},
  {name: 'mfReportes', folder: 'mf-reportes', component: 'reportes.component.ts', port: 4202},
  {name: 'mfAdministracion', folder: 'mf-administracion', component: 'administracion.component.ts', port: 4203}
];

for (const remote of remotes) {
  const expectedUrl = `http://localhost:${remote.port}/remoteEntry.js`;
  if (manifest[remote.name] !== expectedUrl) {
    throw new Error(`Manifiesto inválido para ${remote.name}: ${manifest[remote.name]}`);
  }

  const base = resolve(root, 'projects', remote.folder);
  const requiredFiles = [
    resolve(base, 'webpack.config.js'),
    resolve(base, 'src/main.ts'),
    resolve(base, 'src/bootstrap.ts'),
    resolve(base, 'src/app', remote.component)
  ];

  for (const file of requiredFiles) {
    if (!existsSync(file)) throw new Error(`Falta archivo requerido: ${file}`);
  }

  const federationConfig = readFileSync(resolve(base, 'webpack.config.js'), 'utf8');
  if (!federationConfig.includes(`name: '${remote.name}'`) || !federationConfig.includes("'./Component'")) {
    throw new Error(`La federación de ${remote.name} no expone ./Component correctamente`);
  }

  const mainEntry = readFileSync(resolve(base, 'src/main.ts'), 'utf8');
  if (!mainEntry.includes("import('./bootstrap')")) {
    throw new Error(`${remote.name} no usa arranque asíncrono para negociar dependencias compartidas`);
  }

  const serveOptions = workspace.projects[remote.folder].architect.serve.options;
  if (serveOptions.headers?.['Access-Control-Allow-Origin'] !== '*') {
    throw new Error(`${remote.name} no habilita CORS para el Shell`);
  }
}

const shellRoutes = readFileSync(resolve(root, 'projects/shell/src/app/app.routes.ts'), 'utf8');
for (const remote of remotes) {
  if (!shellRoutes.includes(`remoteName: '${remote.name}'`)) {
    throw new Error(`El Shell no registra la ruta de ${remote.name}`);
  }
}

console.log('Arquitectura validada: 1 Shell + 3 remotos independientes + manifiesto dinámico.');

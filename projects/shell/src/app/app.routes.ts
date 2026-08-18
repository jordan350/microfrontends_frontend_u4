import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'operaciones'},
  {
    path: 'operaciones',
    loadComponent: () => loadRemoteModule({type: 'manifest', remoteName: 'mfOperaciones', exposedModule: './Component'})
      .then(module => module.OperacionesComponent),
    title: 'Operaciones | FinOps'
  },
  {
    path: 'reportes',
    loadComponent: () => loadRemoteModule({type: 'manifest', remoteName: 'mfReportes', exposedModule: './Component'})
      .then(module => module.ReportesComponent),
    title: 'Reportes | FinOps'
  },
  {
    path: 'administracion',
    loadComponent: () => loadRemoteModule({type: 'manifest', remoteName: 'mfAdministracion', exposedModule: './Component'})
      .then(module => module.AdministracionComponent),
    title: 'Administración | FinOps'
  },
  {path: '**', redirectTo: 'operaciones'}
];

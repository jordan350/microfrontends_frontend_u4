import { loadManifest } from '@angular-architects/module-federation';

loadManifest('assets/mf.manifest.json')
  .catch(error => console.error('Error al cargar el manifiesto de microfrontends', error))
  .then(() => import('./bootstrap'))
  .catch(error => console.error('Error al iniciar el Shell', error));

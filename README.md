# Prototipo Microfrontends - Arquitectura Front-End U4

Prototipo local para demostrar una evolución de SPA monolítica hacia un modelo de microfrontends.

## Cómo ejecutarlo

Abra `index.html` en el navegador. No requiere instalación de dependencias.

## Qué demuestra

- Shell principal con navegación global y estado de microfrontend activo.
- Tres dominios funcionales: Operaciones, Reportes y Administración.
- Cada dominio expone una función `render` y una función `mount`, simulando independencia de integración.
- Contratos compartidos de UI mediante variables CSS y convenciones de eventos del shell.

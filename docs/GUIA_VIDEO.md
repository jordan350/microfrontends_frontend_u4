# Evidencia sugerida para el video

1. Mostrar la estructura de cuatro aplicaciones y los tres archivos `webpack.config.js` remotos.
2. Ejecutar `pnpm run start:all` y abrir el Shell en el puerto 4200.
3. Navegar por Operaciones, Reportes y Administración.
4. Abrir Network y señalar que cada dominio carga su propio `remoteEntry.js`.
5. En Operaciones, usar búsqueda, filtro y el botón **Notificar Shell**.
6. Explicar que el evento `finops:operation-selected:v1` evita llamadas directas entre remotos.
7. Mostrar `mf.manifest.json` y explicar que permite cambiar las URLs de despliegue.
8. Cerrar indicando que cada remoto tiene build, puerto y artefacto independiente.

# Entrega final U4 - Angular Microfrontends

Saulo Barbosa - Jordan Garcia

**POLITECNICO GRANCOLOMBIANO** - **ARQUITECTURA FRONT-END**

Prototipo funcional de composición en cliente con un **Shell Angular** y tres aplicaciones remotas separadas mediante **Module Federation**:

- `mf-operaciones`: captura, validación, consulta y seguimiento de operaciones.
- `mf-reportes`: indicadores y analítica de solo lectura.
- `mf-administracion`: roles, parámetros y contratos de gobierno.

## Evidencia arquitectónica

Cada remoto tiene:

- su propio punto de arranque (`main.ts`);
- configuración de Module Federation y `remoteEntry.js`;
- puerto de desarrollo independiente;
- componente Angular expuesto como `./Component`;
- comando de construcción independiente.

El Shell no importa directamente el código fuente de los dominios. Antes de iniciar Angular lee `assets/mf.manifest.json`, registra los tres `remoteEntry.js` y carga el componente correspondiente durante la navegación. Por ello las URLs de despliegue pueden cambiar sin recompilar el Shell.

## Requisitos

- Node.js 20.19 o superior.
- pnpm 10.15.1 o compatible.

## Ejecución local

```bash
pnpm install
pnpm run start:all
```

Abrir `http://localhost:4200`.

Antes de instalar dependencias también puede comprobarse la separación estructural con:

```bash
pnpm run verify:architecture
```

Servicios:

| Aplicación | Puerto | Ejecución individual |
|---|---:|---|
| Shell | 4200 | `pnpm run start:shell` |
| Operaciones | 4201 | `pnpm run start:operaciones` |
| Reportes | 4202 | `pnpm run start:reportes` |
| Administración | 4203 | `pnpm run start:administracion` |

## Construcción y despliegue independiente

```bash
pnpm run build:shell
pnpm run build:operaciones
pnpm run build:reportes
pnpm run build:administracion
```

Los artefactos se generan en carpetas separadas dentro de `dist/`. Cada carpeta puede publicarse en un hosting estático diferente. Después se actualizan las URLs de `projects/shell/src/assets/mf.manifest.json`.

## Contratos y comunicación

El contrato `finops:operation-selected:v1` está definido en `projects/contracts`. El remoto Operaciones publica el evento y el Shell lo consume sin depender directamente del componente remoto. La versión forma parte del nombre y del payload para evitar cambios incompatibles silenciosos.

## Gobierno técnico

- Angular se comparte como dependencia singleton.
- Los tokens visuales se centralizan en `projects/shared`.
- Cada dominio conserva límites, propietario y build independientes.
- El Shell administra navegación, composición y mensajes transversales.
- Los remotos no se llaman directamente entre sí.

## Pruebas demostrables

1. Navegar entre los tres dominios y confirmar que se descarga cada `remoteEntry.js`.
2. Detener un remoto y comprobar que los otros dominios continúan desplegados.
3. Buscar y filtrar operaciones.
4. Pulsar **Notificar Shell** y comprobar la recepción del evento versionado.
5. Ejecutar por separado cualquiera de los tres remotos en su puerto.

## Estructura

```text
projects/
  shell/                 # Host/orquestador
  mf-operaciones/        # Remoto 1
  mf-reportes/           # Remoto 2
  mf-administracion/     # Remoto 3
  contracts/             # Eventos y manifiesto tipados
  shared/                # Design tokens y estilos comunes
```

## Alcance

El prototipo usa datos simulados y no incluye autenticación real ni APIs productivas. Sí implementa separación de aplicaciones, carga remota en tiempo de ejecución, contratos versionados y construcción independiente, que son las evidencias centrales solicitadas para una arquitectura de microfrontends.

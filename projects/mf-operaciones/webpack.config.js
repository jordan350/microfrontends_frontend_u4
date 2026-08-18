const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'mfOperaciones',
  filename: 'remoteEntry.js',
  exposes: {
    './Component': './projects/mf-operaciones/src/app/operaciones.component.ts'
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' })
  }
});

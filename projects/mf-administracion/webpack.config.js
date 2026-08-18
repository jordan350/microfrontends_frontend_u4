const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'mfAdministracion',
  filename: 'remoteEntry.js',
  exposes: {
    './Component': './projects/mf-administracion/src/app/administracion.component.ts'
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' })
  }
});

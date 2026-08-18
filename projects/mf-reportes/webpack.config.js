const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'mfReportes',
  filename: 'remoteEntry.js',
  exposes: {
    './Component': './projects/mf-reportes/src/app/reportes.component.ts'
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' })
  }
});

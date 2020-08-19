const CracoLessPlugin = require('craco-less')
const CracoAlias = require('craco-alias')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#0D0C10' },
            javascriptEnabled: true,
          },
        },
      },
    },
    {
      plugin: CracoAlias,
      options: {
        source: 'options',
        baseUrl: './',
        aliases: {
          // We need to alias react to the one installed in the desktop/node_modules
          // in order to solve the error "hooks can only be called inside the body of a function component"
          // which is encountered during desktop jest unit tests,
          // described at https://github.com/facebook/react/issues/13991
          // This is caused by two different instances of react being loaded:
          // * the first at packages/desktop/node_modules (for HostSignUpDownloadComponent.spec.js)
          // * the second at packages/components/node_modules (for packages/components/Modal)
          react: './node_modules/react',
        },
      },
    },
  ],
}

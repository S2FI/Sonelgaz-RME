const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#ffa940",
              "@font-family": "Segoe UI",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};

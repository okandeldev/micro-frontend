const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  devServer: {
    port: 3001,
  },
  webpack: {
    plugins: {
      add: [
        new ModuleFederationPlugin({
          name: "TodoModule",
          exposes: {
            "./Todo": "./src/shared/Todo",
          },
          filename: "remoteEntry.js",
          shared: {
            react: { singleton: true },
            "react-dom": { singleton: true },
          },
        }),
      ],
    },
    configure: (webpackConfig: any) => ({
      ...webpackConfig,
      output: {
        ...webpackConfig.output,
        publicPath: "auto",
      },
    }),
  },
};
export {}
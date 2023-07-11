const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  devServer: {
    port: 3002,
  },
  webpack: {
    plugins: {
      add: [
        new ModuleFederationPlugin({
          name: "AnotherModule",
          exposes: {
            "./SampleComponent": "./src/shared/SampleComponent",
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
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  devServer: {
    port: 3000,
  },
  webpack: {
    plugins: {
      add: [
        new ModuleFederationPlugin({
          name: "host",
          remotes: {
            TodoModule: "TodoModule@http://localhost:3001/remoteEntry.js",
            AnotherModule: "AnotherModule@http://localhost:3002/remoteEntry.js", 
          }, 
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
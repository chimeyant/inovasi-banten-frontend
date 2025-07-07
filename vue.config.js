const CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
  publicPath: '/auth/',
  chainWebpack(config) {
    config.plugins.delete("prefetch");

    // and this line
    config.plugin("CompressionPlugin").use(CompressionPlugin);
  },
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "/api": {
        target: "https://api.smkn4-kabtangerang.sch.id/",
        changeOrigin: true,
      },
    },
  },
};

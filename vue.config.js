const { defineConfig } = require("@vue/cli-service");

const path = require("path");

const AUTH = "https://auth.worksmobile.com";
const API = "https://www.worksapis.com";

module.exports = {
  devServer: {
    proxy: {
      "/oauth2/v2.0": {
        target: AUTH,
        changeOrigin: true,
      },
      "/v1.0": {
        target: API,
        changeOrigin: true,
      },
    },
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/styles/_variables.scss";`,
      },
    },
  },

  configureWebpack: {
    // resolve.alias는 모듈을 더 쉽게 import, require 하게 만듭니다.
    resolve: {
      alias: {
        scss: path.resolve("./src/assets/scss"),
        // '@'는 현재 프로젝트의 client/src/까지의 최종 경로를 의미합니다.
        "@": path.join(__dirname, "src/"),
      },
    },
  },

  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",

  lintOnSave: false,
};

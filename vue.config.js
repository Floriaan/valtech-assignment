const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
              @import "./src/assets/scss/_functions.scss";
              @import "./src/assets/scss/_mixins.scss";
            `,
      },
    },
  },
});

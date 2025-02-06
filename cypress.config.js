// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
//   projectId: "dzwu31",
// });

// cypress.config.js
const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.feature", // Look for .feature files
    baseUrl: "http://localhost:3000", // Your React app base URL
    chromeWebSecurity: false,
    async setupNodeEvents(on, config) {
      // Create a bundler using esbuild with the cucumber plugin
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });
      on("file:preprocessor", bundler);
      await addCucumberPreprocessorPlugin(on, config);
      return config;
    },
  },
  component: {
    specPattern: "cypress/component/**/*.feature",
    devServer: {
      bundler: "webpack",
      // Point to your custom webpack configuration:
      webpackConfig: require("./webpack.config.js")
    },
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)]
      });
      on("file:preprocessor", bundler);
      await addCucumberPreprocessorPlugin(on, config);
      return config;
    }
  },
});

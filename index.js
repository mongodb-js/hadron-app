/**
 * The global app singleton.
 */
const app = {
  extend: function(...args) {
    args.unshift(this);
    return Object.assign.apply(null, args);
  },

  /**
   * Start the app in the renderer process.
   *
   * @param {String} root - The root directory of the application.
   * @param {Object} config - The application's distribution config in the format:
   *
   *   {
   *     "name": "mongodb-compass",
   *     "packagePrefix": "@mongodb-js/compass",
   *     "productName": "MongoDB Compass",
   *     "pluginsDirectory": ".mongodb/compass/plugins",
   *     "packages": [
   *       "node_modules/@mongodb-js/compass-serverstats",
   *       "node_modules/@mongodb-js/compass-document-validation",
   *       "node_modules/@mongodb-js/compass-deployment-awareness",
   *       "node_modules/@mongodb-js/compass-charts",
   *       "node_modules/@mongodb-js/compass-crud",
   *       "node_modules/@mongodb-js/compass-query-history"
   *     ],
   *     "stylesheet": "app/index.less"
   *   }
   */
  startRenderer: (root, config) => {
    const React = require('react');
    const ReactDOM = require('react-dom');
    const initCaches = require('./lib/renderer/caching');
    const initStyles = require('./lib/renderer/styling');
    const initPlugins = require('./lib/renderer/plugins');
    const HadronApp = require('./lib/components');

    global.hadronApp = this;

    initCaches(root, config);
    initStyles(root, config, () => {
      initPlugins(root, config);
      ReactDOM.render(
        React.createElement(HadronApp),
        document.getElementById('container')
      );
    });
  }
};

module.exports = app;

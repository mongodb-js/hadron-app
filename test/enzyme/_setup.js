/**
 * Creates a headless browser environment with jsdom for server-side testing.
 */
require('babel-register')();

const jsdom = require('jsdom').jsdom;
const exposedProperties = ['window', 'navigator', 'document'];

const doc = jsdom('');
global.document = doc;
global.window = doc;
Object.keys(doc.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = doc.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

global.hadronApp = require('../../');

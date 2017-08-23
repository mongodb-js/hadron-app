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
   */
  startRenderer() {
    // - Setup the package manager.
    // - Setup the caches.
    // - Setup the style manager.
    // - Get the Application.Connect role.
    // - Get the Application.Workspace role.
    // - Render the Application component with the Application.Connect component showing.
    // - On connected, render the application component with the Application.Workspace compnonent showing.
  }
};

module.exports = app;

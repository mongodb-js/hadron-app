const Reflux = require('reflux');
const StateMixin = require('reflux-state-mixin');

/**
 * The core store to the hadron application. Listens for connect events
 * and changes its state based on only those.
 */
const ApplicationStore = Reflux.createStore({
  mixins: [ StateMixin.store ],

  /**
   * When the data service is connected, this lifecycle method gets called.
   *
   * @param {Error} error - A connection error, if any.
   */
  onConnected(error) {
    this.setState({ isConnected: !error });
  },

  /**
   * The initial state is not connected.
   *
   * @returns {Object} The initial state.
   */
  getInitialState() {
    return { isConnected: false };
  }
});

module.exports = ApplicationStore;

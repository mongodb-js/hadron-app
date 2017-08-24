const React = require('react');
const { StoreConnector } = require('hadron-react-components');
const Application = require('./application');
const ApplicationStore = require('../stores');

class HadronApp extends React.Component {

  /**
   * Connects the application component to the store and render it.
   *
   * @returns {React.Component} The component.
   */
  render() {
    return (
      <StoreConnector store={ApplicationStore}>
        <Application {...this.props} />
      </StoreConnector>
    );
  }
}

HadronApp.displayName = 'HadronApp';

module.exports = HadronApp;

const React = require('react');

/**
 * The name of the connect role.
 */
const CONNECT_ROLE = 'Application.Connect';

/**
 * The name of the workspace role.
 */
const WORKSPACE_ROLE = 'Application.Workspace';

/**
 * The base Hadron application component, which controls rendering of the
 * workspace or connect role components.
 */
class Application extends React.Component {

  /**
   * Initialize the applicaiton.
   *
   * @param {Object} props - The properties.
   */
  constructor(props) {
    super(props);
    this.initialize();
  }

  /**
   * Initialize the application component, getting the role components.
   */
  initialize() {
    this.connectRole = global.hadronApp.appRegistry.getRole(CONNECT_ROLE)[0];
    this.workspaceRole = global.hadronApp.appRegistry.getRole(WORKSPACE_ROLE)[0];
  }

  /**
   * Render the Hadron application.
   *
   * @returns {React.Component} The component.
   */
  render() {
    if (this.props.isConnected) {
      return (<this.workspaceRole.component />);
    }
    return (<this.connectRole.component />);
  }
}

Application.propTypes = {
  isConnected: PropTypes.bool.isRequired
};

Application.defaultProps = {
  isConnected: false
}

Application.displayName = 'Application';

module.exports = Application;
module.exports.CONNECT_ROLE = CONNECT_ROLE;
module.exports.WORKSPACE_ROLE = WORKSPACE_ROLE;

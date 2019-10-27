import React, { Component } from 'react';

import { withOAuth } from 'aws-amplify-react';
import SetupTotp from "../components/SetupTotp";
import { Button } from 'react-bootstrap';
import { Hub, Auth } from 'aws-amplify';

class Login extends Component {
  constructor(props) {
    super(props);

    this.loadUser = this.loadUser.bind(this);

    Hub.listen('auth', this, 'navigator'); // Add this component as listener of auth event.

    this.state = { user: null, session: null }
  }

  componentDidMount() {
    this.loadUser(); // The first check
  }

  loadUser() {
    Auth.currentAuthenticatedUser()
      .then(user => this.setState({ user: user }))
      .catch(err => this.setState({ user: null }));
    Auth.currentSession()
      .then(session => this.setState({ session: session }))
      .catch(err => this.setState({ session: null }));
  }

  onHubCapsule(capsule) {
    this.loadUser(); // Triggered every time user sign in / out
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        { !user && <Button variant="dark" onClick={this.props.OAuthSignIn}>Login</Button>}
        { user && <SetupTotp /> }
      </React.Fragment>
    )
  }
}
export default withOAuth(Login);
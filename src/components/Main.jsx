import React, { Component } from 'react';
import { Container } from 'bootstrap-4-react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Profile  from '../pages/Profile';
import User from '../pages/User';
import Doc from './Doc';
import Contact from './Contact';
import AppManager from './AppManager';
import { Hub, Auth } from 'aws-amplify';
import { withOAuth } from 'aws-amplify-react';
import LoadingIndicator from "../components/LoadingIndicator";
import ls from 'local-storage'

class Main extends Component {
  constructor(props) {
    super(props);

    this.loadUser = this.loadUser.bind(this);

    Hub.listen('auth', this, 'navigator'); // Add this component as listener of auth event.

    this.state = { user: null, session: null }
  }

  componentDidMount() {
    this.loadUser(); // The first check
    // const serverPublicKey = `-----BEGIN PUBLIC KEY-----\r\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCi/H8+Oize7Y6Y4Fx4Rp9phOSu\r\nY5IcRV+axAFnzPZM6JxA7b7Ufi5urBbezjOVTqwtBCmzkngUyKDjmv35MHSRiv4j\r\nuR5bnwrqE9OhECySdpbE8ZNT9bZUx2u5Y29VuDBQRdkDk4LDcnAInxRYC+Muf6TV\r\nLHGlP/PMeS/m1n1vAQIDAQAB\r\n-----END PUBLIC KEY-----\r\n`;
    // ls.set('serverPublicKey', serverPublicKey)
    console.log('serverPublicKey');
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
    const { user, session } = this.state;
    return (
      <Container as="main" role="main">
        <div className="starter-template">
          <HashRouter>
            <Switch>
                <Route exact path="/doc" component={Doc} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/apps" render={(props) => <AppManager signIn={this.props.OAuthSignIn} session={session}/>} />
                <Route exact path="/profile" component={() => <Profile signIn={this.props.OAuthSignIn} user={user} session={session}/>} />
                <Route exact path="/users" render={(props) => <User signIn={this.props.OAuthSignIn} user={user} session={session}/>} />} />
                <Route path="/" render={(props) => <Home user={user} />} />
            </Switch>
          </HashRouter>
          <LoadingIndicator/>
        </div>
      </Container>
    )
  }
}
export default withOAuth(Main);

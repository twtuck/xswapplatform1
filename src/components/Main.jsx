import React, { Component } from 'react';
import { Container } from 'bootstrap-4-react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Login  from '../pages/Login';
import Profile  from '../pages/Profile';
import Doc from './Doc';
import Contact from './Contact';
import AppManager from './AppManager';
import { Hub, Auth } from 'aws-amplify';

export default class Main extends Component {
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
    const { user, session } = this.state;
    return (
      <Container as="main" role="main">
        <div className="starter-template">
          <HashRouter>
            <Switch>
                <Route exact path="/doc" component={Doc} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/apps" render={(props) => <AppManager user={user} session={session}/>} />
                <Route exact path="/profile" component={() => <Profile user={user} session={session}/>} />
                <Route exact path="/login" render={(props) => <Login user={user} />} />
                <Route path="/" render={(props) => <Home user={user} />} />
            </Switch>
          </HashRouter>
        </div>
      </Container>
    )
  }
}

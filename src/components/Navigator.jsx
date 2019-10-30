import React, { Component } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Hub, Auth } from 'aws-amplify';
import { withOAuth } from 'aws-amplify-react';

const HomeItems = props => (
  <React.Fragment>
    <Nav.Link href="#/doc">
      API Documentation
    </Nav.Link>
    <Nav.Link href="#/contact">
      Contact Us
    </Nav.Link>
    {props.user && <Nav.Link href="#/apps">
      Application
    </Nav.Link>}
  </React.Fragment>
)

class Navigator extends Component {
  constructor(props) {
    super(props);

    this.loadUser = this.loadUser.bind(this);

    Hub.listen('auth', this, 'navigator'); // Add this component as listener of auth event.

    this.tmp = null;

    this.state = { user: null, session: null, attributes: [] }
  }

  componentDidMount() {
    this.loadUser(); // The first check
  }

  signOut = () => {
    Auth.signOut()
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  loadUser() {
    Auth.currentAuthenticatedUser()
      .then(user => Auth.userAttributes(user)
        .then(attributes => this.setState({ user: user, attributes: attributes }))
        .catch(err => this.setState({ attributes: [] })))
      .catch(err => this.setState({ user: null }));
    Auth.currentSession()
      .then(session => this.setState({ session: session }))
      .catch(err => this.setState({ session: null }));
  }

  onHubCapsule(capsule) {
    this.loadUser(); // Triggered every time user sign in / out
  }

  render() {
    const { user} = this.state;
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/">xSwap</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <HashRouter>
                <Switch>
                  <Route exact path="/doc" component={() => <HomeItems user={user} />} />
                  <Route exact path="/contact" component={() => <HomeItems user={user} />} />
                  <Route exact path="/apps" component={() => <HomeItems user={user} />} />
                  <Route exact path="/profile" component={() => <HomeItems user={user} />} />
                  <Route exact path="/login" component={() => <HomeItems user={user}/>} />
                  <Route path="/" component={() => <HomeItems user={user} />} />
                </Switch>
              </HashRouter>
            </Nav>
            <Nav>
              { !user &&
                <Button variant="dark" onClick={this.props.OAuthSignIn}>Login</Button> }
              { user &&
                <React.Fragment>
                  Hi
                  <Nav.Link href="#/profile">
                    {user.username}
                  </Nav.Link> 
                  <Button variant="dark" onClick={this.props.OAuthSignIn}>Login</Button> 
                </React.Fragment> }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}
export default withOAuth(Navigator);

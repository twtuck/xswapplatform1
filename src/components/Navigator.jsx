import React, { Component } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Hub, Auth } from 'aws-amplify';
import { SignOut, withOAuth, OAuthButton, FederatedButtons, AmplifyTheme } from 'aws-amplify-react';

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

const AppItems = props => (
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

const LoginItems = props => (
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
    const theme = {
      signInButton: {
        display: 'inline-block',
        marginBottom: 0,
        fontSize: '12px',
        fontWeight: 400,
        lineHeight: 1.42857143,
        textAlign: 'center',
        whiteSpace: 'nowrap',
        verticalAlign: 'middle',
        touchAction: 'manipulation',
        cursor: 'pointer',
        color: '#fff',
        backgroundColor: '#f90',
        borderColor: '#ccc',
        textTransform: 'uppercase',
        padding: '0 0 6px 0',
        letterSpacing: '1.1px',
        border: 'none',
        width: 153,
        height: 45,
        borderRadius: 0
      },
    }
    // const Button = React.createElement(
    //     SignInButton, 
    //     { onClick: function () { return Auth.federatedSignIn({ provider: "facebook" })}, variant: 'oAuthSignInButton' });
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
                  <Route exact path="/apps" component={() => <AppItems user={user} />} />
                  <Route exact path="/profile" component={() => <HomeItems user={user} />} />
                  <Route exact path="/login" component={() => <LoginItems/>} />
                  <Route path="/" component={() => <HomeItems user={user} />} />
                </Switch>
              </HashRouter>
            </Nav>
            <Nav>
              { !user &&
                <Button variant="dark" onClick={this.props.OAuthSignIn}>Login</Button> }
              { user &&
                <Nav.Link href="#/profile">
                  {user.username}
                </Nav.Link> }
              <SignOut/>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}
export default withOAuth(Navigator);

import React, { Component } from 'react';
import { Navbar, Nav, BSpan } from 'bootstrap-4-react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Hub, Auth } from 'aws-amplify';
import { SignOut, SignInButton, OAuthButton, FederatedButtons, AmplifyTheme } from 'aws-amplify-react';

const HomeItems = props => (
  <React.Fragment>
    <Nav.ItemLink href="#/doc">
      API Documentation
    </Nav.ItemLink>
    <Nav.ItemLink href="#/contact">
      Contact Us
    </Nav.ItemLink>
    {props.user && <Nav.ItemLink href="#/apps">
      Application
    </Nav.ItemLink>}
    {!props.user && <Nav.ItemLink href="#/login">
      Login
      <BSpan srOnly>(current)</BSpan>
    </Nav.ItemLink>}
  </React.Fragment>
)

const AppItems = props => (
  <React.Fragment>
    <Nav.ItemLink href="#/doc">
      API Documentation
    </Nav.ItemLink>
    <Nav.ItemLink href="#/contact">
      Contact Us
    </Nav.ItemLink>
    {props.user && <Nav.ItemLink href="#/apps" active>
      Application
    </Nav.ItemLink>}
    {!props.user && <Nav.ItemLink href="#/login">
      Login
      <BSpan srOnly>(current)</BSpan>
    </Nav.ItemLink>}
  </React.Fragment>
)

const LoginItems = props => (
  <React.Fragment>
    <Nav.ItemLink href="#/doc">
      API Documentation
    </Nav.ItemLink>
    <Nav.ItemLink href="#/contact">
      Contact Us
    </Nav.ItemLink>
    {props.user && <Nav.ItemLink href="#/apps">
      Application
    </Nav.ItemLink>}
    {!props.user && <Nav.ItemLink href="#/login" active>
      Login
      <BSpan srOnly>(current)</BSpan>
    </Nav.ItemLink>}
  </React.Fragment>
)

export default class Navigator extends Component {
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
      <Navbar expand="md" dark bg="dark" fixed="top">
        <Navbar.Brand href="/">xSwap</Navbar.Brand>
        <Navbar.Toggler target="#navbarsExampleDefault" />

        <Navbar.Collapse id="navbarsExampleDefault">
          <Navbar.Nav mr="auto">
            <HashRouter>
              <Switch>
                <Route exact path="/doc" component={() => <HomeItems user={user} />} />
                <Route exact path="/contact" component={() => <HomeItems user={user} />} />
                <Route exact path="/apps" component={() => <AppItems user={user} />} />
                <Route exact path="/profile" component={() => <HomeItems user={user} />} />
                <Route exact path="/login" component={() => <LoginItems user={user} />} />
                <Route path="/" component={() => <HomeItems user={user} />} />
              </Switch>
            </HashRouter>
          </Navbar.Nav>
        </Navbar.Collapse>
        <OAuthButton theme={theme}/>
        { user &&
          <Navbar.Nav mr="auto">
            <Nav.ItemLink href="#/profile">
              {user.username}
            </Nav.ItemLink>
          </Navbar.Nav>
        }
        <SignOut/>
      </Navbar>
    </div>
    )
  }
}

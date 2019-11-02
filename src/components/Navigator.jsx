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
    {props.user && isAdmin && <Nav.Link href="#/users">
      View Users
    </Nav.Link>}
  </React.Fragment>
)

class Navigator extends Component {
  constructor(props) {
    super(props);

    this.loadUser = this.loadUser.bind(this);

    Hub.listen('auth', this, 'navigator'); // Add this component as listener of auth event.

    this.tmp = null;

    this.state = { user: null, session: null }
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
    let isAdmin = false;
    if (session) {
      let payload = session.getAccessToken().decodePayload();
      let group = payload['cognito:groups'];
      if (group.includes('Administrators')) {
        isAdmin = true;
      }
    }
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/">xSwap</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#/doc">
                API Documentation
              </Nav.Link>
              <Nav.Link href="#/contact">
                Contact Us
              </Nav.Link>
              {user && <Nav.Link href="#/apps">
                Application
              </Nav.Link>}
              {user && isAdmin && <Nav.Link href="#/users">
                View Users
              </Nav.Link>}
              {/* <HashRouter>
                <Switch>
                  <Route exact path="/doc" component={() => <HomeItems user={user} isAdmin={isAdmin}/>} />
                  <Route exact path="/contact" component={() => <HomeItems user={user} isAdmin={isAdmin}/>} />
                  <Route exact path="/apps" component={() => <HomeItems user={user} isAdmin={isAdmin}/>} />
                  {isAdmin && <Route exact path="/profile" component={() => <HomeItems user={user} isAdmin={isAdmin}/>} />}
                  <Route path="/" component={() => <HomeItems user={user} isAdmin={isAdmin}/>} />
                </Switch>
              </HashRouter> */}
            </Nav>
            <Nav>
              { !user &&
                <Button variant="dark" onClick={this.props.OAuthSignIn}>Sign In</Button> }
              { user &&
                <React.Fragment>
                  <Navbar.Text>
                    Hi
                  </Navbar.Text>
                  <a href="#/profile" class='nav-link'>
                    {user.username}
                  </a>
                  <Button variant="dark" onClick={this.signOut}>Sign Out</Button> 
                </React.Fragment> }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}
export default withOAuth(Navigator);

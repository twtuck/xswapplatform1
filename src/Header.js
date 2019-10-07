import React, { Component } from 'react';
import { Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { SignOut, Hub, Auth } from 'aws-amplify-react';

class Header extends Component {constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };

    this.loadUser = this.loadUser.bind(this);

    Hub.listen('auth', this, 'navigator'); // Add this component as listener of auth event.

    this.state = { user: null }
  }

  componentDidMount() {
    this.loadUser(); // The first check
  }

  loadUser() {
    Auth.currentAuthenticatedUser()
      .then(user => this.setState({ user: user }))
      .catch(err => this.setState({ user: null }));
  }

  onHubCapsule(capsule) {
    this.loadUser(); // Triggered every time user sign in / out
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
    render() {
return (
    <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">xSwap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="/doc">API Documentation</Nav.Link>
            <Nav.Link href="/contact">Contact Us</Nav.Link>
            <NavDropdown title="Services" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/apps">Manage Application</NavDropdown.Item>
            </NavDropdown>
            </Nav>
            <Nav>
            <Navbar.Text>Greetings</Navbar.Text>
            <SignOut/>
            <Nav.Link href="/apps">Sign In</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    </div>
  )
}
}

export default Header;
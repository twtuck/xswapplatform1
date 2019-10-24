import React, { Component } from 'react';
import { Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { SignInButton } from 'aws-amplify-react/dist/AmplifyUI';

class Header extends Component {constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
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
                <NavDropdown.Item href="/">Manage Application</NavDropdown.Item>
            </NavDropdown>
            </Nav>
            <Nav>
            <Nav.Link href="#deets">Profile</Nav.Link>
            <SignInButton></SignInButton>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    </div>
  )
}
}

export default Header;
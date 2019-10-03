import React, { Component } from 'react';
import { Nav, NavDropdown, Navbar } from 'react-bootstrap';

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
        <Navbar.Brand href="#home">xSwap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="#features">API Documentation</Nav.Link>
            <Nav.Link href="#pricing">Contact Us</Nav.Link>
            <NavDropdown title="Services" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Manage Application</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Manage All Application</NavDropdown.Item>
            </NavDropdown>
            </Nav>
            <Nav>
            <Nav.Link href="#deets">Profile</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
                Logout
            </Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    </div>
  )
}
}

export default Header;
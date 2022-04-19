import React from 'react'
import { Navbar,Nav,NavItem } from "react-bootstrap";
//routing using link

const Header = () => {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Employee Management System</Navbar.Brand>        
          <Nav className="me-auto">
            <Nav.Link href="/list">Home</Nav.Link>
            <Nav.Link href="/addemployee">Add Employee</Nav.Link>
          </Nav>
      </Navbar>
    </div>
  )
}

export default Header
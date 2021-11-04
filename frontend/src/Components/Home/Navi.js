import React, { useState } from 'react'
import './Navi.css'

import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';


const Navi = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const logout = () => {
    console.log('logged out');
    localStorage.setItem('username', null);
    window.location.href = "http://localhost:8080/";
  }

  const navbarFirstDropdown = () => {
    const type = localStorage.getItem('usertype');
    if (type === "jury") {
      return true;
    }
    return false;
  }

  const accountDropdown = () => {
    const us = localStorage.getItem('username');
    const isLoggedIn = us !== null && us !== "null";
    if (isLoggedIn) {
      return (
        <div>
          <DropdownItem className="dropdownItem">
            <NavLink href="/profile/">PROFILE INFO</NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink href="/signedHackathons/">SIGNED HACKATHONS</NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink href="/privateChat/">MESSAGES</NavLink>
          </DropdownItem>
          <DropdownItem className="dropdownItem">
            <Button className="logout-btn" onClick={() => { logout() }}>LOGOUT</Button>
          </DropdownItem>
        </div>
      )
    } else {
      return (
        <div>
          <DropdownItem className="dropdownItem">
            <NavLink href="/login/">LOGIN</NavLink>
          </DropdownItem>
          <DropdownItem className="dropdownItem">
            <NavLink href="/register/">REGISTER</NavLink>
          </DropdownItem>
        </div>
      )
    }
  };

  const navbarSecond = () => {
    const username = localStorage.getItem('username');
    if (username === 'mahir.bastas@metu.edu.tr') {
      return (
        <NavItem className="dropdownItem">
          <NavLink href="/jurie/">JURY PANEL</NavLink>
        </NavItem>
      )
    } else if (username === 'admin@asd.com') { }
    else if (username !== "null" && username !== null) {
      return (
        <NavItem>
          <NavLink href="/matching/">MATCHING</NavLink>
        </NavItem>
      )
    }
  }

  const navbarThird = () => {
    const username = localStorage.getItem('username');
    if (username === 'gokbel.betul@metu.edu.tr') {
      return (
        <NavItem className="dropdownItem">
          <NavLink href="/eventMain/">MANAGE EVENT</NavLink>
        </NavItem>
      )
    } else if (username === 'mahir.bastas@metu.edu.tr') {

    } else if (username === 'admin@asd.com') { }
    else if (username !== "null" && username !== null) {
      return (
        <NavItem>
          <NavLink href="/eventMain/">EVENT DETAILS</NavLink>
        </NavItem>
      )
    }
  }

  const showAdminLink = () => {
    const username = localStorage.getItem('username');
    if (username === 'admin@asd.com') {
      return (
        <NavbarText>
          <NavLink href="/admin/">ADMIN PAGE</NavLink>
        </NavbarText>
      )
    } else {
      <NavbarText>
        <NavLink href="#" style={{color:'black'}}>ADMIN PAGE</NavLink>
      </NavbarText>
    }
  }

  return (
    <div>
      <Navbar light expand="md" className='navBar'>
        <NavbarBrand id="navbar-logo" href="/">HOP!</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">HACKATHONS</NavLink>
            </NavItem>
            {navbarSecond()}
            {navbarThird()}
          </Nav>
          <UncontrolledDropdown nav inNavbar style={{ marginRight: '48px !important;' }}>
            <DropdownToggle nav caret>
              ACCOUNT
            </DropdownToggle>
            <DropdownMenu right className='accountDropdown'>
              {accountDropdown()}
            </DropdownMenu>
          </UncontrolledDropdown>
          {showAdminLink()}
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Navi;
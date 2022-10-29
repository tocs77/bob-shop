import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

import { FaShoppingCart, FaUser } from 'react-icons/fa';

const Header = () => {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand href='/'>Bob-Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <Nav.Link href='/cart'>
                <div className='d-flex align-items-center'>
                  <FaShoppingCart className='mr-1' />
                  Cart
                </div>
              </Nav.Link>
              <Nav.Link href='/login'>
                <div className='d-flex align-items-center'>
                  <FaUser className='mr-1 text-vertical' />
                  Sign In
                </div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

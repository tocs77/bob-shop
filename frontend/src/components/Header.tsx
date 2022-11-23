import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

import { userInfoSelector } from '../reducers/user/selectors';
import { logout } from '../reducers/user/actions';

import { useAppDispatch, useAppSelector } from '../hooks';

const Header = () => {
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };
  const userInfo = useAppSelector(userInfoSelector);
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Link to='/'>
            <Navbar.Brand>Bob-Shop</Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <Nav.Link href='/cart'>
                <div className='d-flex align-items-center'>
                  <FaShoppingCart className='mr-1' />
                  Cart
                </div>
              </Nav.Link>
              {Object.keys(userInfo).length !== 0 ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <NavDropdown.Item to='/profile' as={Link}>
                    Profile
                  </NavDropdown.Item>

                  <NavDropdown.Item onClick={logoutHandler}>Log Out</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link href='/login'>
                  <div className='d-flex align-items-center'>
                    <FaUser className='mr-1 text-vertical' />
                    Sign In
                  </div>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

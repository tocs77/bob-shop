import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button, Form } from 'react-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';

import { userInfoSelector, loadingSelector, errorSelector } from '../reducers/user/selectors';
import { updateDetails } from '../reducers/user/actions';
import { useAppDispatch, useAppSelector } from '../hooks';
import { IUserCredentials } from '../reducers/user/actions';

const ProfieScreen = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const userInfo = useAppSelector(userInfoSelector);
  const loading = useAppSelector(loadingSelector);
  const error = useAppSelector(errorSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(userInfo).length === 0) navigate('/login');
    if (userInfo.name) setName(userInfo.name);
    if (userInfo.email) setEmail(userInfo.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  useEffect(() => {
    setMessage('');
  }, []);

  const updateDetailsHandler = () => {
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    const payload: IUserCredentials = { name, email };
    if (password) payload.password = password;
    dispatch(updateDetails(payload));
  };

  return (
    <Row>
      <Col md={4}>
        <h2>User Profile</h2>
        {error && <Message variant='danger'>{error}</Message>}
        {message && <Message variant='danger'>{message}</Message>}
        {loading && <Loader />}
        <Form>
          <Form.Group controlId='name'>
            <Form.Label>Your Name</Form.Label>
            <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='confirmpassword'>
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant='primary' onClick={updateDetailsHandler} className='mt-2 rounded'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={8}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfieScreen;

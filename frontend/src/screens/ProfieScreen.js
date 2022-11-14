import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Form } from 'react-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';

import { userInfoSelector, loadingSelector, errorSelector } from '../reducers/user/selectors';
import { updateDetails } from '../reducers/user/actions';

const ProfieScreen = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState();
  const [confirmPassword, setConfirmPassword] = useState('');
  const userInfo = useSelector(userInfoSelector);
  const loading = useSelector(loadingSelector);
  const error = useSelector(errorSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(userInfo).length === 0) navigate('/login');
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo]);

  useEffect(() => {
    setMessage('');
  }, []);

  const updateDetailsHandler = () => {
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    const payload = { name, email };
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

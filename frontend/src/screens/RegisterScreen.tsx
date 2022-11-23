import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Row, Col, Button, Form } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

import { userInfoSelector, loadingSelector, errorSelector } from '../reducers/user/selectors';
import { register } from '../reducers/user/actions';
import { useAppDispatch, useAppSelector } from '../hooks';

const RegisterScreen = () => {
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
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('next') || '/';

  useEffect(() => {
    console.log(redirect);
    if (Object.keys(userInfo).length !== 0) navigate(redirect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  const registerHandler = () => {
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    dispatch(register({ name, email, password }));
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
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
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='confirmpassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant='primary' onClick={registerHandler} className='mt-2 rounded'>
          Register
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Have an account? <Link to={redirect ? `/login?next=${redirect}` : '/login'}>Log In</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;

import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Form } from 'react-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

import { userInfoSelector, loadingSelector, errorSelector } from '../reducers/user/selectors';
import { login } from '../reducers/user/actions';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userInfo = useSelector(userInfoSelector);
  const loading = useSelector(loadingSelector);
  const error = useSelector(errorSelector);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('next') || '/';

  useEffect(() => {
    console.log(redirect);
    console.log('Effect user', userInfo);
    if (userInfo) navigate(redirect);
  }, [userInfo]);

  const loginHandler = () => {
    dispatch(login({ email, password }));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form>
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
        <Button variant='primary' onClick={loginHandler} className='mt-2 rounded'>
          Sign In
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          New customer? <Link to={redirect ? `/register?next=${redirect}` : '/register'}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;

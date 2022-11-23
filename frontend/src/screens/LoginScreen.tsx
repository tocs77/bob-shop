import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Row, Col, Button, Form } from 'react-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { userInfoSelector, loadingSelector, errorSelector } from '../reducers/user/selectors';
import { login } from '../reducers/user/actions';

import { useAppDispatch, useAppSelector } from '../hooks';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userInfo = useAppSelector(userInfoSelector);
  const loading = useAppSelector(loadingSelector);
  const error = useAppSelector(errorSelector);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('next') || '';

  useEffect(() => {
    console.log(redirect);
    if (Object.keys(userInfo).length !== 0) navigate(`/${redirect}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

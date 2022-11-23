import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Button, Form } from 'react-bootstrap';
import { shippingAddressSelector } from '../reducers/cart/selectors';
import { updatePaymentMethod } from '../reducers/cart/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

import FormContainer from '../components/FormContainer';
import { useAppDispatch, useAppSelector } from '../hooks';

function PaymentScreen() {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const shippingAddress = useAppSelector(shippingAddressSelector);

  useEffect(() => {
    if (!shippingAddress || Object.keys(shippingAddress).length === 0) navigate('/shipping');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingAddress]);

  const submitHandler = () => {
    dispatch(updatePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Paymnet Method</h1>
      <Form>
        <Form.Group controlId='paymentMethod'>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked={paymentMethod === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              checked={paymentMethod === 'Stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Button variant='primary' onClick={submitHandler} className='mt-3 rounded'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;

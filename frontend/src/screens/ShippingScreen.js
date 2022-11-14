import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { shippingAddressSelector } from '../reducers/cart/selectors';
import { updateShippingAddress } from '../reducers/cart/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

import FormContainer from '../components/FormContainer';

function ShippingScreen() {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const shippingAddress = useSelector(shippingAddressSelector);

  useEffect(() => {
    setAddress(shippingAddress.address || '');
    setCity(shippingAddress.city || '');
    setPostalCode(shippingAddress.postalCode || '');
    setCountry(shippingAddress.country || '');
  }, [shippingAddress]);

  const submitHandler = () => {
    dispatch(updateShippingAddress({ address, city, country, postalCode }));
    navigate('/payment');
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required={true}
          />
        </Form.Group>
        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required={true}
          />
        </Form.Group>
        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Postal Code'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required={true}
          />
        </Form.Group>
        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required={true}
          />
        </Form.Group>
        <Button variant='primary' onClick={submitHandler} className='mt-3 rounded'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen;

import React, { useEffect } from 'react';
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, Card, ListGroup, Button, Form } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { addToCart, removeItem } from '../reducers/cart/actions';
import { cartItemsSelector } from '../reducers/cart/selectors';

import { useAppDispatch, useAppSelector } from '../hooks';

import Message from '../components/Message';

const CartScreen = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const qtyString = searchParams.get('qty');
  const qty = qtyString ? parseInt(qtyString) : 0;
  const cartItems = useAppSelector(cartItemsSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id || !qty) return;
    dispatch(addToCart({ id, qty }));
  }, []);

  const checkoutHandler = () => {
    navigate('/login?next=shipping');
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant='primary'>
            Your cart is empty<Link to='/'>Go back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) => dispatch(addToCart({ id: item.product, qty: parseInt(e.target.value) }))}>
                      {[...Array(item.countInStock).keys()].map((v) => (
                        <option value={v + 1} key={v}>
                          {v + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button type='button' variant='light' onClick={() => dispatch(removeItem(item.product))}>
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((s, item) => s + Number(item.qty), 0)}) items</h2>$
              {cartItems.reduce((s, item) => s + Number(item.qty) * Number(item.price), 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                Proceed to checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;

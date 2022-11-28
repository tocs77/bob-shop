import React, { useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';

import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { orderSelector, errorSelector, loadingSelector } from '../reducers/order/selectors';
import { userInfoSelector } from '../reducers/user/selectors';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getOrder } from '../reducers/order/actions';

import { useAppDispatch, useAppSelector } from '../hooks';

function OrderScreen() {
  const order = useAppSelector(orderSelector);
  const error = useAppSelector(errorSelector);
  const loading = useAppSelector(loadingSelector);
  const user = useAppSelector(userInfoSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    dispatch(getOrder(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!order) return <></>;
  if (loading) return <Loader />;
  if (error) return <Message variant='danger'>{error.toString()}</Message>;

  const itemsPrice = order.orderItems.reduce((s, item) => s + Number(item.qty) * Number(item.price), 0);
  return (
    <>
      <h1>Order: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> <a href={`mailto:${user.email}`}>{user.email}</a>
              </p>

              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>{`Delivered at ${order.deliveredAt}`}</Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>{`Paid at ${order.paidAt}`}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>

              {order.orderItems.length > 0 ? (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={item.product}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col md={6}>
                          <Link to={`/products/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={5}>{`${item.qty} x $${item.price} = $${(item.qty * item.price).toFixed(2)}`}</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <Message variant='primary'>Your cart is empty</Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default OrderScreen;

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useNavigate, createSearchParams } from 'react-router-dom';
import { Row, Col, Image, Card, ListGroup, Button, Form } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';

import { productSelector, loadingSelector, errorSelector } from '../reducers/products/selectors';
import { getProductDetails } from '../reducers/products/actions';

import Rating from '../components/Rating';

function ProductScreen() {
  const { id } = useParams();
  const product = useSelector(productSelector);
  const loading = useSelector(loadingSelector);
  const error = useSelector(errorSelector);
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, []);

  const addToCartHandler = () => {
    navigate({ pathname: `/cart/${id}`, search: `?${createSearchParams({ qty })}` });
  };
  return (
    <>
      <Link className='btn btn-outline-dark rounded my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <h2>
          <Message variant='danger'>{error}</Message>
        </h2>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>Description: {product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                          {[...Array(product.countInStock).keys()].map((v) => (
                            <option value={v + 1} key={v}>
                              {v + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    className='btn-block rounded'
                    type='button'
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}>
                    Add toCart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}

export default ProductScreen;

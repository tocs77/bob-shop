import React, { useEffect } from 'react';

import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';

import { useAppDispatch, useAppSelector } from '../hooks';

import { getProducts } from '../reducers/products/actions';
import { productsSelector, loadingSelector, errorSelector } from '../reducers/products/selectors';

function HomeScreen() {
  const products = useAppSelector(productsSelector);
  const loading = useAppSelector(loadingSelector);
  const error = useAppSelector(errorSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <h2>
          <Message variant='danger'>{error}</Message>
        </h2>
      ) : (
        <Row>
          {products.map((p) => (
            <Col key={p._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={p} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}

export default HomeScreen;

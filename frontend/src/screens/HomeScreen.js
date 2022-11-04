import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';

import { getProducts } from '../reducers/products/actions';
import { productsSelector, loadingSelector, errorSelector } from '../reducers/products/selectors';

function HomeScreen() {
  const products = useSelector(productsSelector);
  const loading = useSelector(loadingSelector);
  const error = useSelector(errorSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <h2>loading</h2>
      ) : error ? (
        <h2>{error}</h2>
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

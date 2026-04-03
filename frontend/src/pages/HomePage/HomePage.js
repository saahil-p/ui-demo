import { Layout, Row, Col, Alert, Spin } from "antd";
import { Header, Content } from "antd/es/layout/layout";
import React, { useEffect } from "react";
import Navbar from '../../components/Navabr/Navbar';
import ProductCard from '../../components/Product/Product';
import {
  selectProducts,
  selectProductsLoading,
  selectProductsError
} from "../../redux/selectors/cartSelectors";
import { fetchProducts } from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";


const HomePage = ()=>{

  const dispatch = useDispatch();

  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Layout className = "homepage-layout">
        <Header className = "homepage-header">
            <Navbar />
        </Header>

        <Content className="homepage-content">
            <div className="products-container">
                <h1 className="products-title">
                    Featured Products
                </h1>

                {loading && (
                  <div className = "loading-spinner-container">
                    <Spin className = "loading-spinner" tip = "Loading products....." />
                  </div>
                )}

                {error && (
                  <div className = "loading-products-error">
                    <Alert message = "Error Loading Products" type = "error" showIcon/>
                  </div>
                )}


                {!loading && !error && (
                <Row gutter={[24, 24]}>
                    {products.map(product => (
                        <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                            <ProductCard product={product} />
                        </Col>
                    ))}
                </Row>
                )}
            </div>
        </Content>
    </Layout>
  );
};

export default HomePage;
import React, { useEffect, useState } from 'react';
import axios from '../axios';
import AliceCarousel from 'react-alice-carousel';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import SimilarProduct from '../components/SimilarProduct';

const ProductPage = () => {
    const {id} = useParams();
    const user = useSelector(state => state.user);
    const [product, setProduct] = useState(null);
    const [similar, setSimilar] = useState(null);

    const handleDragStart = (e) => e.preventDefault();
    useEffect(() => {
        axios.get(`/products/${id}`)
        .then(({data}) => {
            setProduct(data.product);
            setSimilar(data.similar);
        })
    }, [id])
    const images = product.pictures.map((picture) => <img className='product__carouel--image' src={picture.url} onDragStart={handleDragStart} /> )

    if (!product) {
        return <Loading />
    }

    let similarProducts = [];
    if (similar) {
        similarProducts = similar.map((product, idx) => (
            <div className='item' data-value={idx}>
                <SimilarProduct />
            </div>
        ))
    }

  return (
    <Container className='pt-4' style={{position: 'relative'}}>
        <Row>
            <Col lg={6}>
                <AliceCarousel mouseTracking items={images} controlsStrategy='alternate' />
            </Col>
        </Row>
    </Container>
  )
}

export default ProductPage;
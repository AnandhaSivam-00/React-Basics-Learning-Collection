import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import '../ReduxApp.module.css'
import { fetchProducts } from '../redux/actions/productActions';

const ProductDisplay = () => {
  const productData = useSelector(state => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (productData.loading) {
    return <span className='text-secondary'>Loading...</span>;
  }

  if (productData.error) {
    return <div className="product-container border p-3">Error: {productData.error}</div>;
  }

  if (!productData.data || productData.data.length === 0) {
    return <div className="product-container border p-3">No product data available.</div>;
  }

  return (
    <div className='d-flex flex-column align-items-center'>
      {productData.data.map(product => (
        <div key={product.id} className="product-container border p-3 d-flex flex-row gap-4 align-items-start mb-4 rounded" style={{ maxWidth: 600 }}>
          <img
            src={product.image}
            alt={product.title}
            style={{ width: 150, height: 150, objectFit: 'contain', borderRadius: 8, background: '#f8f8f8' }}
          />
          <div className="flex-grow-1">
            <h5 className="mb-2">{product.title}</h5>
            <div className="mb-1 text-muted" style={{ fontSize: 14 }}>{product.category}</div>
            <div className="mb-2" style={{ fontWeight: 500, color: '#1a8917' }}>${product.price}</div>
            <p className="mb-2" style={{ fontSize: 15 }}>{product.description}</p>
            <div style={{ fontSize: 14 }}>
              <span>⭐ {product.rating?.rate} </span>
              <span className="text-secondary">({product.rating?.count} reviews)</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductDisplay
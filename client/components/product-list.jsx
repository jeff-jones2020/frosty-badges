import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    }
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => {
        this.setState({
          products: data
        })
      })
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    const products = this.state.products;
    const productListItems = [];
    for(let i = 0; i < products.length; i++){
      const { productId, name, price, image, shortDescription } = products[i];
      productListItems.push(
        <div className='col-12 col-md-6 col-lg-4 mb-4 card-container' key={productId}>
        <ProductListItem
          productId = {productId}
          name = {name}
          price = {price}
          image = {image}
          shortDescription = {shortDescription} />
        </div>
      )
    }

    return (
      <section className='product-list mx-auto row col-12'>
        {productListItems}
      </section>
    );
  }
}

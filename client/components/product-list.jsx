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
        <ProductListItem
          productId = {productId}
          name = {name}
          price = {price}
          image = {image}
          shortDescription = {shortDescription} />
      )
    }

    return (
      <section className='product-list d-flex flex-wrap col-11 card-deck'>
        {productListItems}
      </section>
    );
  }
}

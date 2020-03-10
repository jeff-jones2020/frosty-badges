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
      productListItems.push(
        {productId, name, price, image, shortDescripton} = products[i];
        <ProductListItem
          productId = {productId}
          name = {name}
          price = {price}
          image = {image}
          shortDescripton = {shortDescripton} />
      )
    }


    return (
      <div>ProductList</div>
    );
  }
}

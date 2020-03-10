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
    return (
      <div>ProductList</div>
    );
  }
}

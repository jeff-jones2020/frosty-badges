import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    }

    this.setView = this.setView.bind(this);
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

  setView(e) {
    const name = 'details';
    const {productId} = e.target;
    this.props.setViewCallback(name, {productId: productId});
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
        <div className='col-9 col-sm-5 col-md-4 mb-4 card-container' key={productId}>
        <ProductListItem
          productId = {productId}
          name = {name}
          price = {price}
          image = {image}
          shortDescription = {shortDescription}
          setViewCallback = {this.setView}/>
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

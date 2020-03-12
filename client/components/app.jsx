import React from 'react';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };

    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  getCartItems() {
    fetch('/api/cart')
      .then(response => response.json())
      .then(data => {
        this.setState({
          cart: Array.from(data)
        })
      })
  }

  addToCart(product) {
    const reqBody = JSON.stringify({productId: product.productId});
    fetch('/api/cart', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: reqBody
    })
      .then(response => response.json())
      .then(data => {
        const newCart = this.state.cart.concat([data]);
        this.setState({
          cart: newCart
        })
      })
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));

    this.getCartItems();
  }

  render() {
    const viewName = this.state.view.name;

    if(viewName === 'catalog')
      return (
        <>
          <Header cartItemCount={this.state.cart.length} setViewCallback={this.setView} />
          <ProductList setViewCallback={this.setView} />
        </>
      );
    else if (viewName === 'details')
      return (
        <>
          <Header cartItemCount={this.state.cart.length} setViewCallback={this.setView} />
          <ProductDetails
            viewParams={this.state.view.params}
            setViewCallback={this.setView}
            addToCartCallback={this.addToCart} />
        </>
      );
    else if (viewName === 'cart')
        return(
          <>
            <Header cartItemCount={this.state.cart.length} setViewCallback={this.setView} />
            <CartSummary
              cartItems={this.state.cart}
              setViewCallback={this.setView}/>
          </>
        );
  }
}

class Header extends React.Component {
  constructor(props){
    super(props);
    this.setView = this.setView.bind(this);
  }

  setView() {
    this.props.setViewCallback('cart', {});
  }

  render() {
    return (
      <div className='navbar-expand-md mb-4'>
        <nav id='header' className="d-flex justify-content-start navbar navbar-dark bg-dark">
          <a className='nav-brand'>$</a>
          <div>
            <a className='nav-item ml-2'>Wicked Sales</a>
          </div>
          <div className='ml-auto' onClick={this.setView}>
            <i className='fas fa-shopping-cart'></i>
            <span id='cart-count' className='ml-1'>({this.props.cartItemCount})</span>
          </div>
        </nav>
      </div>
    );
  }
}

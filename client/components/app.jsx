import React from 'react';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      showWarning: true,
      view: {
        name: 'catalog',
        params: {}
      },
      cart: [],
      cartTotal: 0
    };

    this.toggleWarning = this.toggleWarning.bind(this);
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.changeQty = this.changeQty.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  toggleWarning() {
    this.setState({
      showWarning: false
    });
    document.getElementsByTagName('body')[0].classList.remove('disable-scroll');
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
        });
      })
      .catch(err => {
        console.error('Error fetching cart:', err);
      });
  }

  addToCart(product, iterations = 0) {
    const reqBody = JSON.stringify({ productId: product.productId });
    fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: reqBody
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response);
        }
        return response.json();
      })
      .then(data => {
        this.getCartItems();
      })
      .catch(err => {
        if (iterations < 1) {
          setTimeout(() => this.addToCart(product, ++iterations), 100);
        } else {
          console.error('Error fetching cart when adding new item:', err);
        }
      });
  }

  changeQty(productId, quantity) {
    const reqBody = JSON.stringify({ productId: productId, quantity: quantity });
    fetch('/api/cart', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: reqBody
    })
      .then(response => response.json())
      .then(data => {
        this.getCartItems();
      })
      .catch(err => {
        console.error('Error fetching cart when changing item quantity:', err);
      });
  }

  removeFromCart(productId) {
    fetch(`/api/cart/${productId}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        this.getCartItems();
      })
      .catch(err => {
        console.error('Error fetching cart when deleting item:', err);
      });
  }

  placeOrder(orderData) {
    const reqBody = JSON.stringify(orderData);

    return fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: reqBody
    })
      .then(response => response.json())
      .then(data => {
        if (data.orderId) {
          this.setState({
            cart: [],
            view: {
              name: this.state.view.name,
              params: {}
            }
          });
          return true;
        }
      });
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

    if (viewName === 'catalog' && this.state.showWarning) {
      return (
        <>
          <DemoWarning toggleWarning={this.toggleWarning} />
          <Header/>
          <ProductList />
        </>
      );
    } else if (viewName === 'catalog') {
      return (
        <>
          <Header cartItemCount={this.state.cart.length} setViewCallback={this.setView} />
          <ProductList setViewCallback={this.setView} />
        </>
      );
    } else if (viewName === 'details') {
      return (
        <>
          <Header cartItemCount={this.state.cart.length} setViewCallback={this.setView} />
          <ProductDetails
            viewParams={this.state.view.params}
            setViewCallback={this.setView}
            addToCartCallback={this.addToCart}
            toggleWarning={this.toggleWarning} />
        </>
      );
    } else if (viewName === 'cart') {
      return (
        <>
          <Header cartItemCount={this.state.cart.length} setViewCallback={this.setView} />
          <CartSummary
            cartItems={this.state.cart}
            setViewCallback={this.setView}
            changeQtyCallback={this.changeQty}
            removeFromCartCallback={this.removeFromCart} />
        </>
      );
    } else if (viewName === 'checkout') {
      return (
        <>
          <Header cartItemCount={this.state.cart.length} setViewCallback={this.setView} />
          <CheckoutForm
            cartItems={this.state.cart}
            setViewCallback={this.setView}
            placeOrderCallback={this.placeOrder} />
        </>
      );
    }
  }
}

class Header extends React.Component {
  constructor(props) {
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
          <a id='nav-brand'>
            <img src='images/favicon.png'></img>
          </a>
          <div>
            <a className='nav-item ml-2'>Frosty Badges</a>
          </div>
          <div className='ml-auto cart' onClick={this.setView}>
            <i className='fas fa-shopping-cart'></i>
            <span id='cart-count' className='ml-1'>({this.props.cartItemCount})</span>
          </div>
        </nav>
      </div>
    );
  }
}

function DemoWarning(props) {
  document.getElementsByTagName('body')[0].classList.add('disable-scroll');

  return (
    <section id='modal-wrapper'>
      <div id='modal'>
        <h1 className='text-danger'>Warning</h1>
        <h3 className='mb-4'>This website is a demo; <em>no real purchases will be made.</em></h3>
        <button id='warning-modal-button' type='button' onClick={props.toggleWarning} className='btn btn-primary'>I understand</button>
      </div>
    </section>
  );
}

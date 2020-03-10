import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true
    };
  }

  Header() {
    return (
      <section id='header' className='d-flex'>
        <div className='bold'>$</div>
        <div className='ml-2'>Wicked Sales</div>
      </section>
    )
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    return (
      this.Header()
    )
  }
}

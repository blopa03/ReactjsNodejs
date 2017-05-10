// src/components/App/index.js
import React, { Component } from 'react';
import classnames from 'classnames';

class App extends Component {
  static propTypes = {}
  static defaultProps = {}
  state = {}
  
  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classnames('App', className)} {...props}>
         
      </div>
    );
  }
}

export default App;

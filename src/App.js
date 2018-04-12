import React, { Component } from 'react';

import './App.css';
import Auth from './components/Login/Auth';
import Header from './components/Header'

class App extends Component {
  constructor() {
    super();
    this.state = {
      sessionToken: ''
    }
    this.setSessionState = this.setSessionState.bind(this)
    this.logout = this.logout.bind(this)
  }
  setSessionState(token) {
    localStorage.setItem('token', token);
    this.setState({ sessionToken: token });
  }
  componentDidMount() {
    const token = localStorage.getItem('token')

    if (token && !this.state.sessionToken) {
      this.setState({ sessionToken: token });
    }
  }
  logout() {
    console.log('logout')
    this.setState({ sessionToken: '' });
    localStorage.removeItem('token');
  }

  render() {
    return (
      <div className='map'>
        <Header clickLogout={this.logout} token={this.state.sessionToken}/>
        <Auth setSessionToken={this.setSessionState}/>
        
      </div>
    );
  }
}


export default App;
